import { IUsersService } from './users.service.interface';
import { UserRegisterDto } from './dto/user.register.dto';
import { User } from './user.entity';
import { UserLoginDto } from './dto/user.login.dto';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '../types';
import { IConfigService } from '../config/config.service.interface';
import { ConfigService } from '../config/config.service';
@injectable()
export class UsersService implements IUsersService {
	constructor(@inject(TYPES.IConfigService) private configService: ConfigService) {}
	async createUser({ email, name, password }: UserRegisterDto): Promise<User | null> {
		const newUser = new User(email, name);
		const salt: number = this.configService.get<number>('SALT');
		console.log(salt);
		await newUser.setPassword(password, salt);
		return null;
	}

	async validateUser(dto: UserLoginDto): Promise<boolean> {
		return true;
	}
}
