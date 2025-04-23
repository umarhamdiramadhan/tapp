"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TiketH2hValidation = void 0;
const zod_1 = require("zod");
class TiketH2hValidation {
}
exports.TiketH2hValidation = TiketH2hValidation;
TiketH2hValidation.REQUEST = zod_1.z.object({
    ip: zod_1.z.string().min(1),
    memberid: zod_1.z.string().min(1),
    pin: zod_1.z.string().min(1),
    password: zod_1.z.string().min(1),
    nominal: zod_1.z.number().min(1),
});
