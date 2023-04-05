import {App} from "./app.js";
import {LoggerService} from "./logger/logger.service";
import {UsersController} from "./users/users.controller";
import {ExceptionFilter} from "./errors/exception.filter";
import {Container, ContainerModule, interfaces} from "inversify";
import {ILogger} from "./logger/logger.interface";
import {TYPES} from "./types";
import {IExceptionFilter} from "./errors/exception.filter.interface";

// export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
//
// });

const appContainer = new Container();

const app = appContainer.get<App>(TYPES.Application);
app.init();

export {app, appContainer}