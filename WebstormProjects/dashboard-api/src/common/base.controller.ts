import { LoggerService } from '../logger/logger.service';
import { Response, Router } from 'express';
import { Logger } from 'tslog';
import { IControllerRoute } from './route.interface';
import { ILogger } from '../logger/logger.interface';
import { injectable } from 'inversify';
export { Router } from 'express';
import 'reflect-metadata';
import { IUsersController } from '../users/users.interface';
@injectable()
export abstract class BaseController {
	private readonly _router: Router;
	private logger: LoggerService;
	constructor(logger: ILogger) {
		this.logger = logger;
		this._router = Router();
	}

	get router(): Router {
		return this._router;
	}

	public bindRoutes(routes: IControllerRoute[]): void {
		for (const route of routes) {
			this.logger.log(`${route.method} bind ${route.path}`);
			const handler = route.func.bind(this);
			this.router[route.method](route.path, handler);
		}
	}

	public created(res: Response): Response {
		return res.sendStatus(201);
	}

	public send<T>(res: Response, message: T, code: number): Response {
		res.type('application/json');
		return res.status(code).json(message);
	}

	public ok<T>(res: Response, message: T): Response<any, Record<string, any>> {
		return this.send<T>(res, message, 200);
	}
}
