import { IMiddleware } from './middleware.interface';
import { Response, NextFunction, Request } from 'express';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

export class ValidateMiddleware implements IMiddleware {
	constructor(private classToValidate: ClassConstructor<object>) {}
	public execute(req: Request, res: Response, next: NextFunction): void {
		const instance = plainToInstance(this.classToValidate, req.body);
		validate(instance).then((errors) => {
			if (errors.length > 0) {
				res.status(422).send(errors);
			} else {
				next();
			}
		});
	}
}
