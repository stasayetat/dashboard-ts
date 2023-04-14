import { IMiddleware } from './middleware.interface';
import { Request, Response, NextFunction } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';

export class AuthMiddleware implements IMiddleware {
	constructor(private secret: string) {}
	execute(req: Request, res: Response, next: NextFunction): void {
		if (req.headers.authorization) {
			verify(req.headers.authorization.split(' ')[1], this.secret, (err, payload) => {
				if (err) {
					next();
				} else if (payload) {
					const infoPayload = payload as JwtPayload;
					req.user = infoPayload?.email;
					next();
				}
			});
		} else {
			next();
		}
	}
}
