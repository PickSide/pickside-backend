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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const index = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('aaa');
    let users = yield User_1.default.find();
    return resp.json('users');
});
const store = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    return resp.json('dev');
});
const update = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    return resp.json('dev');
});
const destroy = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    return resp.json({ status: 'The dev was deleted successfully' });
});
exports.default = {
    index,
    store,
    update,
    destroy,
};
//# sourceMappingURL=User.js.map