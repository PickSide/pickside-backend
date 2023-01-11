"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = __importDefault(require("./controllers/User"));
const routes = (0, express_1.Router)();
routes.get('/user', User_1.default.index);
exports.default = routes;
//# sourceMappingURL=routes.js.map