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
exports.TiketH2hService = void 0;
const database_1 = require("../../application/database");
const response_error_api_h2h_1 = require("../../error/response-error-api-h2h");
const genarete_number_1 = require("../../utils/genarete-number");
const validation_1 = require("../../validation/validation");
const validation_h2h_service_1 = require("../validation-h2h/validation-h2h-service");
const tiket_h2h_model_1 = require("./tiket-h2h-model");
const tiket_h2h_validation_1 = require("./tiket-h2h-validation");
class TiketH2hService {
    static requestTiketH2h(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkRequest = validation_1.Validation.validate(tiket_h2h_validation_1.TiketH2hValidation.REQUEST, request);
            yield validation_h2h_service_1.ValidationH2hService.validationH2h(checkRequest.memberid, checkRequest.password, checkRequest.pin, checkRequest.ip);
            const checkNominalTiket = yield database_1.prismaClient.tiket.findFirst({
                where: {
                    kode_resellers: checkRequest.memberid,
                    nominal_sama: checkRequest.nominal
                }
            });
            if (checkNominalTiket) {
                const response = (0, tiket_h2h_model_1.toResponseTiketH2h)(checkNominalTiket.nominal_ticket);
                throw new response_error_api_h2h_1.ResponseErrorApiH2h(response);
            }
            const randomNumber = (0, genarete_number_1.generateRandomFrom1To3000)();
            const totalNominal = Math.ceil(checkRequest.nominal + randomNumber);
            const requestTiket = yield database_1.prismaClient.tiket.create({
                data: {
                    nominal_ticket: totalNominal,
                    nominal_sama: checkRequest.nominal,
                    kode_resellers: checkRequest.memberid
                }
            });
            return (0, tiket_h2h_model_1.toResponseTiketH2h)(requestTiket.nominal_ticket);
        });
    }
}
exports.TiketH2hService = TiketH2hService;
