"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AppConfigSchema = new mongoose_1.Schema({
    darkModeEnabled: { type: Boolean, require: true },
    locale: { type: String, require: true },
    description: { type: String, require: true },
});
exports.default = (0, mongoose_1.model)('AppConfig', AppConfigSchema);
//# sourceMappingURL=AppConfig.js.map