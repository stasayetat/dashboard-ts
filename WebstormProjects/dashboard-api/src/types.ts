import { ExceptionFilter } from './errors/exception.filter';
import { IUsersService } from './users/users.service.interface';
import { IConfigService } from './config/config.service.interface';
import { PrismaService } from './database/prisma.service';
import { IUsersRepository } from './users/users.repository.interface';

export const TYPES = {
	Application: Symbol.for('Application'),
	ILogger: Symbol.for('ILogger'),
	IUsersController: Symbol.for('IUsersController'),
	IExceptionFilter: Symbol.for('IExceptionFilter'),
	IUsersService: Symbol.for('IUsersService'),
	IConfigService: Symbol.for('IConfigService'),
	PrismaService: Symbol.for('PrismaService'),
	IUsersRepository: Symbol.for('IUsersRepository'),
};
