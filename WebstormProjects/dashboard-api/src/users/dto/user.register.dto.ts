import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
	@IsString({ message: 'Invalid name' })
	name: string;
	@IsEmail({}, { message: 'Invalid email' })
	email: string;
	@IsString({ message: 'Invalid password' })
	password: string;
}
