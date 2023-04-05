"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appContainer = exports.app = void 0;
const app_js_1 = require("./app.js");
const logger_service_1 = require("./logger/logger.service");
const users_controller_1 = require("./users/users.controller");
const exception_filter_1 = require("./errors/exception.filter");
const inversify_1 = require("inversify");
const types_1 = require("./types");
const appContainer = new inversify_1.Container();
exports.appContainer = appContainer;
appContainer.bind(types_1.TYPES.ILogger).to(logger_service_1.LoggerService);
appContainer.bind(types_1.TYPES.IExceptionFilter).to(exception_filter_1.ExceptionFilter);
appContainer.bind(types_1.TYPES.UsersController).to(users_controller_1.UsersController);
appContainer.bind(types_1.TYPES.Application).to(app_js_1.App);
const app = appContainer.get(types_1.TYPES.Application);
exports.app = app;
app.init();
