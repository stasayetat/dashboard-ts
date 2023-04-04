import {LoggerService} from "../logger/logger.service";
import {Response, Router} from "express";
import {Logger} from "tslog";
import {IControllerRoute} from "./route.interface";
export {Router} from 'express';

export abstract class BaseController {
    private readonly _router: Router;
    private logger: LoggerService;
    constructor(logger: LoggerService) {
        this.logger = logger;
        this._router = Router();
    }

    get router() {
        return this._router;
    }

     protected bindRoutes(routes:IControllerRoute[]) {
        for(let route of routes) {
            this.logger.log(`${route.method} bind ${route.path}`);
            const handler = route.func.bind(this);
            this.router[route.method](route.path, handler);
        }
    }

    public created(res: Response) {
        return res.sendStatus(201);
    }

    public send<T>(res: Response, message: T, code: number) {
        res.type('application/json');
        return res.status(code).json(message);
    }

    public ok<T>(res: Response, message: T) {
        return this.send<T>(res, message, 200);
    }
}