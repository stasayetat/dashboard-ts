import { IUsersService } from './users.service.interface';
import { UserRegisterDto } from './dto/user.register.dto';
import { User } from './user.entity';
import { UserLoginDto } from './dto/user.login.dto';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '../types';
@injectable()
export class UsersService implements IUsersService {
	async createUser({ email, name, password }: UserRegisterDto): Promise<User | null> {
		const newUser = new User(email, name);
		await newUser.setPassword(password);
		return null;
	}

	async validateUser(dto: UserLoginDto): Promise<boolean> {
		return true;
	}
}
