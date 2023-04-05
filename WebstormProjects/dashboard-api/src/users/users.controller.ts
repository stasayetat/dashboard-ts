import { BaseController } from '../common/base.controller';
import { LoggerService } from '../logger/logger.service';
import { IControllerRoute } from '../common/route.interface';
import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../errors/http-error.class';
import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import 'reflect-metadata';
import { IUsersController } from './users.interface';
import { UserLoginDto } from './dto/user.login.dto';
import { UserRegisterDto } from './dto/user.register.dto';
import { User } from './user.entity';

@injectable()
export class UsersController extends BaseController implements IUsersController {
	private userMethod: IControllerRoute[] = [
		{
			path: '/login',
			func: this.login,
			method: 'post',
		},
		{
			path: '/register',
			func: this.register,
			method: 'post',
		},
	];
	constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
		super(loggerService);
		this.bindRoutes(this.userMethod);
	}

	public login(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction): void {
		console.log(req.body);
		next(new HttpError(401, 'Error with login'));
	}

	public async register(
		{ body }: Request<{}, {}, UserRegisterDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const newUser = new User(body.email, body.name);
		await newUser.setPassword(body.password);
		// res.send('Register');
		this.ok(res, res);
	}
}
