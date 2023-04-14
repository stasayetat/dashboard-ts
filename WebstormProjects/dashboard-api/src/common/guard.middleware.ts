import { IMiddleware } from './middleware.interface';
import { Response, NextFunction, Request } from 'express';
export class GuardMiddleware implements IMiddleware {
	public execute(req: Request, res: Response, next: NextFunction): void {
		if (req.user) {
			next();
		} else {
			res.status(401).send({ error: 'Login failed' });
		}
	}
}
