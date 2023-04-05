import { ExceptionFilter } from './errors/exception.filter';
import { IUsersService } from './users/users.service.interface';

export const TYPES = {
	Application: Symbol.for('Application'),
	ILogger: Symbol.for('ILogger'),
	IUsersController: Symbol.for('IUsersController'),
	IExceptionFilter: Symbol.for('IExceptionFilter'),
	IUsersService: Symbol.for('IUsersService'),
};
