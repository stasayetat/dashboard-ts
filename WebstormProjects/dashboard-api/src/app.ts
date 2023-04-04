import express, {Express} from 'express'
import {Server} from 'http';
import {LoggerService} from "./logger/logger.service";
import {UsersController} from "./users/users.controller";
export class App {
    public app: Express;
    public server: Server;
    public port: number;
    public logger: LoggerService;
    public userController: UsersController;

    constructor(logger: LoggerService, userController: UsersController) {
        this.app = express();
        this.port = 8000;
        this.logger = logger;
        this.userController = userController;
    }

    public useRoutes() {
        this.app.use('/users', this.userController.router);
    }

    public async init() {
        this.useRoutes();
        this.server = this.app.listen(this.port);
        this.logger.log('Server started!');
    }
}