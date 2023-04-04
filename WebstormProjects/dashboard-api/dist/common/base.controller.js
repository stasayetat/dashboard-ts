"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = exports.Router = void 0;
const express_1 = require("express");
var express_2 = require("express");
Object.defineProperty(exports, "Router", { enumerable: true, get: function () { return express_2.Router; } });
class BaseController {
    constructor(logger) {
        this.logger = logger;
        this._router = (0, express_1.Router)();
    }
    get router() {
        return this._router;
    }
    bindRoutes(routes) {
        for (let route of routes) {
            this.logger.log(`${route.method} bind ${route.path}`);
            const handler = route.func.bind(this);
            this.router[route.method](route.path, handler);
        }
    }
    created(res) {
        return res.sendStatus(201);
    }
    send(res, message, code) {
        res.type('application/json');
        return res.status(code).json(message);
    }
    ok(res, message) {
        return this.send(res, message, 200);
    }
}
exports.BaseController = BaseController;
