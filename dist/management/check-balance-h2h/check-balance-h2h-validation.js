"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckSaldoH2hValidation = void 0;
const zod_1 = require("zod");
class CheckSaldoH2hValidation {
}
exports.CheckSaldoH2hValidation = CheckSaldoH2hValidation;
CheckSaldoH2hValidation.CHECK = zod_1.z.object({
    ip: zod_1.z.string().min(1),
    memberid: zod_1.z.string().min(1),
    pin: zod_1.z.string().min(1),
    password: zod_1.z.string().min(1),
});
