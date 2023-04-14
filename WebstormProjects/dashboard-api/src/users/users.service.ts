import { IUsersService } from './users.service.interface';
import { UserRegisterDto } from './dto/user.register.dto';
import { User } from './user.entity';
import { UserLoginDto } from './dto/user.login.dto';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '../types';
import { IConfigService } from '../config/config.service.interface';
import { ConfigService } from '../config/config.service';
import { IUsersRepository } from './users.repository.interface';
import e from 'express';
import { UserModel } from '@prisma/client';
import bcrypt from 'bcryptjs';
@injectable()
export class UsersService implements IUsersService {
	constructor(
		@inject(TYPES.IConfigService) private configService: ConfigService,
		@inject(TYPES.IUsersRepository) private usersRepository: IUsersRepository,
	) {}
	async createUser({ email, name, password }: UserRegisterDto): Promise<UserModel | null> {
		const newUser = new User(email, name);
		const salt = this.configService.get('SALT');
		await newUser.setPassword(password, Number(salt));
		const existedUser = await this.usersRepository.find(email);
		if (existedUser) {
			return null;
		} else {
			return await this.usersRepository.create(newUser);
		}
	}

	async validateUser(dto: UserLoginDto): Promise<boolean> {
		const loginUser = await this.usersRepository.find(dto.email);
		if (!loginUser) {
			return false;
		} else {
			const res = await bcrypt.compare(dto.password, loginUser.password);
			if (res) {
				return true;
			} else {
				return false;
			}
		}
		return true;
	}

	async getUserInfo(email: string): Promise<UserModel | null> {
		return await this.usersRepository.find(email);
	}
}
