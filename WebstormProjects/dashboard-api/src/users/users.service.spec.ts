import { Container } from 'inversify';
import { IUsersService } from './users.service.interface';
import { IConfigService } from '../config/config.service.interface';
import { IUsersRepository } from './users.repository.interface';
import { TYPES } from '../types';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { User } from './user.entity';
import { UserModel } from '@prisma/client';
import 'reflect-metadata';

const ConfigServiceMock: IConfigService = {
	get: jest.fn(),
};

const UsersRepositoryMock: IUsersRepository = {
	create: jest.fn(),
	find: jest.fn(),
};

const container = new Container();
let configService: IConfigService;
let usersRepository: IUsersRepository;
let usersService: IUsersService;

beforeAll(() => {
	container.bind<IConfigService>(TYPES.IConfigService).toConstantValue(ConfigServiceMock);
	container.bind<IUsersRepository>(TYPES.IUsersRepository).toConstantValue(UsersRepositoryMock);
	container.bind<IUsersService>(TYPES.IUsersService).to(UsersService);
	configService = container.get<IConfigService>(TYPES.IConfigService);
	usersRepository = container.get<IUsersRepository>(TYPES.IUsersRepository);
	usersService = container.get<IUsersService>(TYPES.IUsersService);
});

let createdUser: UserModel | null;

describe('User Service', () => {
	it('createUser', async () => {
		configService.get = jest.fn().mockReturnValueOnce('1');
		usersRepository.create = jest.fn().mockImplementationOnce(
			(user: User): UserModel => ({
				name: user.name,
				email: user.email,
				password: user.password,
				id: 1,
			}),
		);
		createdUser = await usersService.createUser({
			email: 'a@a.com',
			name: 'Pavlo',
			password: '1',
		});
		expect(createdUser?.id).toEqual(1);
		expect(createdUser?.password).not.toEqual('1');
	});
	it('validateUser success', async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(createdUser);
		const booleanRes = await usersService.validateUser({
			email: 'a@a.com',
			password: '1',
		});
		expect(booleanRes).toBeTruthy();
	});
	it('validateUser not find loginUser', async () => {
		const booleanRes = await usersService.validateUser({
			email: 'a@a.com',
			password: '1',
		});
		expect(booleanRes).toBeFalsy();
	});
	it('validateUser password not compare', async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(null);
		const booleanRes = await usersService.validateUser({
			email: 'a@a.com',
			password: '2',
		});
		expect(booleanRes).toBeFalsy();
	});
});
