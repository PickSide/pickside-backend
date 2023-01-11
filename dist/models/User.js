"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    id: { type: String, require: true },
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    email: { type: String, require: true },
    sexe: { type: String, require: true },
    level: { type: Number, require: true },
    reliability: { type: Number, require: true },
    matchPlayed: { type: Number, require: true },
    matchOrganized: { type: Number, require: true },
    localeRegion: { type: String, require: true },
});
exports.default = (0, mongoose_1.model)('User', UserSchema);
//# sourceMappingURL=User.js.map