"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InboxValidation = void 0;
const zod_1 = require("zod");
class InboxValidation {
}
exports.InboxValidation = InboxValidation;
InboxValidation.VIEW = zod_1.z.object({
    date_start: zod_1.z.string().optional(),
    date_end: zod_1.z.string().optional(),
    pesan: zod_1.z.string().optional(),
    page: zod_1.z.number().min(1).positive(),
    size: zod_1.z.number().min(1).positive()
});
