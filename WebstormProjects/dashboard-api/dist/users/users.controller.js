"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const base_controller_1 = require("../common/base.controller");
class UsersController extends base_controller_1.BaseController {
    constructor(logger) {
        super(logger);
        this.userMethod = [{
                path: '/login',
                func: (req, res, next) => {
                    res.send('Login');
                },
                method: 'post'
            }, {
                path: '/register',
                func: (req, res, next) => {
                    res.send('Register');
                },
                method: 'post'
            }];
        this.bindRoutes(this.userMethod);
    }
}
exports.UsersController = UsersController;
