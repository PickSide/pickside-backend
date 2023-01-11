"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const mongoose_1 = require("mongoose");
const databaseUtils_1 = __importDefault(require("./utils/databaseUtils"));
const app = (0, express_1.default)();
(0, dotenv_1.config)();
(0, mongoose_1.connect)(databaseUtils_1.default.getDatabaseURI()).then(() => console.log('Connected to db!'));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(routes_1.default);
app.listen(process.env.LISTEN_PORT);
//# sourceMappingURL=app.js.map