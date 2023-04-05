import express, {Express} from 'express'
import {Server} from 'http';
import {UsersController} from "./users/users.controller";
import {ILogger} from "./logger/logger.interface";
import {IExceptionFilter} from "./errors/exception.filter.interface";
import {inject, injectable} from "inversify";
import {TYPES} from "./types";
import 'reflect-metadata';
@injectable()
export class App {
    public app: Express;
    public server: Server;
    public port: number;

    constructor(@inject(TYPES.ILogger) private logger: ILogger,
                @inject(TYPES.UsersController) private userController: UsersController,
                @inject(TYPES.IExceptionFilter) private exceptionFilter: IExceptionFilter) {
        this.app = express();
        this.port = 8000;
    }

    public useRoutes() {
        this.app.use('/users', this.userController.router);
    }

    public useExceptionFilters() {
        this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
    }

    public async init() {
        this.useRoutes();
        this.useExceptionFilters();
        this.server = this.app.listen(this.port);
        this.logger.log('Server started!');
    }
}