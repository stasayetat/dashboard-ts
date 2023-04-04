import {BaseController} from "../common/base.controller";
import {LoggerService} from "../logger/logger.service";
import {IControllerRoute} from "../common/route.interface";
import {NextFunction, Request, Response} from "express";

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
    constructor(logger: LoggerService) {
        super(logger);
        this.bindRoutes(this.userMethod);
    }

    private login(req: Request, res: Response, next: NextFunction) {
        res.send('Login');
    }

    private register(req: Request, res: Response, next: NextFunction) {
        res.send('Register');
    }
}