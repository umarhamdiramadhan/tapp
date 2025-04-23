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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckSaldoH2hService = void 0;
const database_1 = require("../../application/database");
const validation_1 = require("../../validation/validation");
const check_balance_h2h_model_1 = require("./check-balance-h2h-model");
const check_balance_h2h_validation_1 = require("./check-balance-h2h-validation");
const validation_h2h_service_1 = require("../validation-h2h/validation-h2h-service");
const moment_timezone_1 = __importDefault(require("moment-timezone"));
class CheckSaldoH2hService {
    static check(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkRequest = validation_1.Validation.validate(check_balance_h2h_validation_1.CheckSaldoH2hValidation.CHECK, request);
            yield validation_h2h_service_1.ValidationH2hService.validationH2h(checkRequest.memberid, checkRequest.password, checkRequest.pin, checkRequest.ip);
            const member = yield database_1.prismaClient.reseller.findFirst({
                where: {
                    kode_reseller: checkRequest.memberid
                }
            });
            const startOfDayUTC = moment_timezone_1.default.tz('Asia/Jakarta').startOf('day').toDate();
            const endOfDayUTC = moment_timezone_1.default.tz('Asia/Jakarta').endOf('day').toDate();
            const transaksi = yield database_1.prismaClient.transaction.count({
                where: {
                    tanggal_entry: {
                        gte: startOfDayUTC,
                        lte: endOfDayUTC
                    },
                    kode_resellers: checkRequest.memberid
                }
            });
            return (0, check_balance_h2h_model_1.toCheckSaldoH2h)(member.kode_reseller, member.saldo, transaksi);
        });
    }
}
exports.CheckSaldoH2hService = CheckSaldoH2hService;
