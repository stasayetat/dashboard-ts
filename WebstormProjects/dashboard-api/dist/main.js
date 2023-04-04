"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_js_1 = require("./app.js");
const logger_service_1 = require("./logger/logger.service");
const users_controller_1 = require("./users/users.controller");
function bootStrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const logger = new logger_service_1.LoggerService();
        const app = new app_js_1.App(logger, new users_controller_1.UsersController(logger));
        yield app.init();
    });
}
bootStrap();