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
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const zod_1 = require("zod");
const response_error_api_1 = require("../error/response-error-api");
const library_1 = require("@prisma/client/runtime/library");
const logging_1 = require("../application/logging");
const errorMiddleware = (error, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (error instanceof zod_1.ZodError) {
        res.status(400).json({
            errors: `Validation Error : ${JSON.stringify(error)}`
        });
    }
    else if (error instanceof response_error_api_1.ResponseErrorApi) {
        res.status(error.status).json({
            errors: error.message
        });
    }
    else if (error instanceof library_1.PrismaClientKnownRequestError) {
        res.status(400).json({
            errors: "value yang kamu masukan duplikat"
        });
    }
    else {
        logging_1.logger.error(`eror 500 ${error}`);
        res.status(500).json({
            errors: error.message
        });
    }
});
exports.errorMiddleware = errorMiddleware;
