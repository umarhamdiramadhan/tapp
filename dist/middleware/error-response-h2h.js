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
exports.errorMiddlewareH2h = void 0;
const library_1 = require("@prisma/client/runtime/library");
const response_error_api_h2h_1 = require("../error/response-error-api-h2h");
const errorMiddlewareH2h = (error, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (error instanceof response_error_api_h2h_1.ResponseErrorApiH2h) {
        console.log(`${error}`);
        res.send(`test  aaaaaa ${error.message}`);
    }
    else if (error instanceof library_1.PrismaClientKnownRequestError) {
        console.log(`eror prisma ${error}`);
        res.send(`value yang kamu masukan duplikat`);
    }
    else {
        console.log(`eror 500 ${error}`);
        res.send(`${error.message}`);
    }
});
exports.errorMiddlewareH2h = errorMiddlewareH2h;
