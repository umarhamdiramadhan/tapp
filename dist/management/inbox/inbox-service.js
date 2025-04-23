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
exports.InboxService = void 0;
const database_1 = require("../../application/database");
const date_now_indonesia_1 = require("../../utils/date-now-indonesia");
const get_date_indonesia_1 = require("../../utils/get-date-indonesia");
const validation_1 = require("../../validation/validation");
const inbox_model_1 = require("./inbox-model");
const inbox_validation_1 = require("./inbox-validation");
class InboxService {
    static view(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchRequest = validation_1.Validation.validate(inbox_validation_1.InboxValidation.VIEW, request);
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
            if (searchRequest.pesan) {
                filters.push({
                    pesan: {
                        contains: searchRequest.pesan
                    }
                });
            }
            const inboxs = yield database_1.prismaClient.inbox.findMany({
                where: {
                    date: {
                        gte: startOfDayUTC,
                        lte: endOfDayUTC
                    },
                    AND: filters
                },
                take: searchRequest.size,
                orderBy: {
                    date: 'asc',
                },
                skip: skip
            });
            const total = yield database_1.prismaClient.inbox.count({
                where: {
                    AND: filters
                }
            });
            return {
                data: inboxs.map(inboxs => (0, inbox_model_1.toInboxResponse)(inboxs)),
                paging: {
                    current_page: searchRequest.page,
                    total_page: Math.ceil(total / searchRequest.size),
                    size: searchRequest.size
                }
            };
        });
    }
    static createInbox(pesan) {
        return __awaiter(this, void 0, void 0, function* () {
            const inboxCreate = yield database_1.prismaClient.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                yield tx.inbox.create({
                    data: {
                        pesan: pesan
                    }
                });
            }));
        });
    }
}
exports.InboxService = InboxService;
