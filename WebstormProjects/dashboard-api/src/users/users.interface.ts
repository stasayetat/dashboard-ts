import { IControllerRoute } from '../common/route.interface';
import { NextFunction, Request, Response } from 'express';

export interface IUsersController {
	bindRoutes(routes: IControllerRoute[]): void;
	login(req: Request, res: Response, next: NextFunction): void;
	register(req: Request, res: Response, next: NextFunction): void;
}
