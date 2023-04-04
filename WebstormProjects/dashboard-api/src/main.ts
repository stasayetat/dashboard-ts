import {App} from "./app.js";
import {LoggerService} from "./logger/logger.service";
import {UsersController} from "./users/users.controller";

async function bootStrap() {
    const logger = new LoggerService();
    const app = new App(logger, new UsersController(logger));
    await app.init();
}

bootStrap();