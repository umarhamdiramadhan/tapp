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
const web_1 = require("./application/web");
const logging_1 = require("./application/logging");
const node_cron_1 = __importDefault(require("node-cron"));
const tiket_service_1 = require("./management/tiket/tiket-service");
function tiketExpired() {
    return __awaiter(this, void 0, void 0, function* () {
        yield tiket_service_1.TiketService.ExpiredTiket();
    });
}
node_cron_1.default.schedule('0 0 22 * * *', () => {
    tiketExpired();
}, {
    timezone: "asia/jakarta"
});
web_1.web.listen(3000, () => {
    const memoryUsage = process.memoryUsage();
    console.log('Memory Usage:', memoryUsage);
    console.log(`Waktu Jakarta saat ini: ${new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })}`);
    logging_1.logger.info("Listening on port 3000");
});
