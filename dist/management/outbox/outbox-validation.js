"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutboxValidation = void 0;
const zod_1 = require("zod");
class OutboxValidation {
}
exports.OutboxValidation = OutboxValidation;
OutboxValidation.VIEW = zod_1.z.object({
    date_start: zod_1.z.string().optional(),
    date_end: zod_1.z.string().optional(),
    pesan: zod_1.z.string().optional(),
    page: zod_1.z.number().min(1).positive(),
    size: zod_1.z.number().min(1).positive()
});
