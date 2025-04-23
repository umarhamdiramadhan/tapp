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
exports.chekBalanceH2hController = void 0;
const zod_1 = require("zod");
const check_balance_h2h_service_1 = require("./check-balance-h2h-service");
const response_error_api_h2h_1 = require("../../error/response-error-api-h2h");
const library_1 = require("@prisma/client/runtime/library");
const logging_1 = require("../../application/logging");
const inbox_service_1 = require("../inbox/inbox-service");
class chekBalanceH2hController {
    static checkBalanceH2h(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = {
                    memberid: req.query.memberid,
                    pin: req.query.pin,
                    password: req.query.password,
                    ip: req.ip
                };
                const queryParameters = req.query;
                const queryString = new URLSearchParams(queryParameters).toString();
                const inbox = yield inbox_service_1.InboxService.createInbox(queryString);
                const response = yield check_balance_h2h_service_1.CheckSaldoH2hService.check(request);
                res.send(response);
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    res.send(`Validation Error Silahkan masukan memberId atau pin atau password`);
                }
                else if (error instanceof response_error_api_h2h_1.ResponseErrorApiH2h) {
                    res.send(`${error.message}`);
                }
                else if (error instanceof library_1.PrismaClientUnknownRequestError) {
                    res.send(`value yang kamu masukan duplikat`);
                }
                else {
                    logging_1.logger.error(error);
                    res.send(`terjadi error 500 silahkan kirim ulang`);
                }
            }
        });
    }
}
exports.chekBalanceH2hController = chekBalanceH2hController;
