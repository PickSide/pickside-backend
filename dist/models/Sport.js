"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const SportSchema = new mongoose_1.Schema({
    id: { type: String, require: true },
    value: { type: String, require: true },
    description: { type: String, require: true },
});
exports.default = (0, mongoose_1.model)('Sport', SportSchema);
//# sourceMappingURL=Sport.js.map