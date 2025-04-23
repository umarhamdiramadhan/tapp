"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
class UserValidation {
}
exports.UserValidation = UserValidation;
UserValidation.REGISTER = zod_1.z.object({
    email: zod_1.z.string().min(1).max(100).email(),
    password: zod_1.z.string().min(1).max(255),
    name: zod_1.z.string().min(1).max(100),
    role: zod_1.z.enum(["administrator", "admin", "cs", "operator"]),
    is_aktif: zod_1.z.boolean()
});
UserValidation.UPDATE = zod_1.z.object({
    email: zod_1.z.string().min(1).max(100).email(),
    password: zod_1.z.string().min(1).max(255).optional(),
    name: zod_1.z.string().min(1).max(100).optional(),
    role: zod_1.z.enum(["administrator", "admin", "cs", "operator"]).optional(),
    is_aktif: zod_1.z.boolean().optional()
});
UserValidation.LOGIN = zod_1.z.object({
    email: zod_1.z.string().min(1).max(100).email(),
    password: zod_1.z.string().min(1).max(255),
});
UserValidation.DELETE = zod_1.z.object({
    email: zod_1.z.string().min(1).max(100).email(),
});
UserValidation.VIEW = zod_1.z.object({
    email: zod_1.z.string().min(1).max(100).optional(),
    name: zod_1.z.string().min(1).max(100).optional(),
    page: zod_1.z.number().min(1).positive(),
    size: zod_1.z.number().min(1).max(100).positive()
});
