import {BaseController} from "../common/base.controller";
import {LoggerService} from "../logger/logger.service";
import {IControllerRoute} from "../common/route.interface";
import {NextFunction, Request, Response} from "express";
import {HttpError} from "../errors/http-error.class";
import {inject, injectable} from "inversify";
import {ILogger} from "../logger/logger.interface";
import {TYPES} from "../types";
import 'reflect-metadata';

@injectable()
export class UsersController extends BaseController{
    private userMethod: IControllerRoute[] = [{
        path: '/login',
        func: this.login,
        method: 'post'
    }, {
        path: '/register',
        func: this.register,
        method: 'post'
    }];
    constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
        super(loggerService);
        this.bindRoutes(this.userMethod);
    }

    private login(req: Request, res: Response, next: NextFunction) {
        next(new HttpError(401, 'Error with login'));
    }

    private register(req: Request, res: Response, next: NextFunction) {
        res.send('Register');
    }
}