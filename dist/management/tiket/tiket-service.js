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
exports.TiketService = void 0;
const database_1 = require("../../application/database");
const date_now_indonesia_1 = require("../../utils/date-now-indonesia");
const get_date_indonesia_1 = require("../../utils/get-date-indonesia");
const validation_1 = require("../../validation/validation");
const tiket_model_1 = require("./tiket-model");
const tiket_validation_1 = require("./tiket-validation");
class TiketService {
    static view(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchRequest = validation_1.Validation.validate(tiket_validation_1.TiketValidation.VIEW, request);
            const skip = (searchRequest.page - 1) * searchRequest.size;
            const startDate = (0, get_date_indonesia_1.getJakartaDate)(searchRequest.date_start);
            const startOfDayUTC = searchRequest.date_start ?
                new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), 0, 0, 0) :
                date_now_indonesia_1.startOfDayUTCNow;
            const endDate = (0, get_date_indonesia_1.getJakartaDate)(searchRequest.date_end);
            const endOfDayUTC = searchRequest.date_end ?
                new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), 23, 59, 59) :
                date_now_indonesia_1.endOfDayUTCNow;
            const filters = [];
            if (searchRequest.kode_resellers) {
                filters.push({
                    kode_resellers: {
                        contains: searchRequest.kode_resellers
                    }
                });
            }
            const filterNames = [];
            if (searchRequest.nama_resellers) {
                filterNames.push({
                    nama_reseller: {
                        contains: searchRequest.nama_resellers
                    }
                });
            }
            const ticket = yield database_1.prismaClient.tiket.findMany({
                where: {
                    resellers: {
                        // nama_reseller:{
                        //     contains:searchRequest.nama_reseller,
                        // }
                        AND: filterNames
                    },
                    date: {
                        gte: startOfDayUTC,
                        lte: endOfDayUTC
                    },
                    kode_resellers: searchRequest.kode_resellers,
                },
                take: searchRequest.size,
                orderBy: {
                    date: 'asc',
                },
                skip: skip,
                include: {
                    resellers: {
                        select: {
                            nama_reseller: true
                        }
                    }
                },
            });
            const total = yield database_1.prismaClient.tiket.count({
                where: {
                    resellers: {
                        // nama_reseller:{
                        //     contains:searchRequest.nama_reseller,
                        // }
                        AND: filterNames
                    },
                    AND: filters
                }
            });
            return {
                data: ticket.map(tickets => (0, tiket_model_1.toTiketResponse)(tickets, tickets.resellers.nama_reseller)),
                paging: {
                    current_page: searchRequest.page,
                    total_page: Math.ceil(total / searchRequest.size),
                    size: searchRequest.size
                }
            };
        });
    }
    static ExpiredTiket() {
        return __awaiter(this, void 0, void 0, function* () {
            const tiket = yield database_1.prismaClient.tiket.updateMany({
                where: {
                    status: true,
                },
                data: {
                    status: false
                }
            });
            console.log("berhasil membuat expired");
            return "Berhasil membuat expired tiket";
        });
    }
}
exports.TiketService = TiketService;
