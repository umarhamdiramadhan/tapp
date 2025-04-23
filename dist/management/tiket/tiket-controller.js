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
exports.TiketController = void 0;
const tiket_service_1 = require("./tiket-service");
class TiketController {
    static view(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('dijalan kan cronjob');
                const request = {
                    kode_resellers: req.query.kode_resellers,
                    nama_resellers: req.query.nama_resellers,
                    date_start: req.query.date_start,
                    date_end: req.query.date_end,
                    page: req.query.page ? Number(req.query.page) : 1,
                    size: req.query.size ? Number(req.query.size) : 20,
                };
                const response = yield tiket_service_1.TiketService.view(request);
                res.status(200).json(response);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.TiketController = TiketController;
