"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.endOfDayUTCNow = exports.startOfDayUTCNow = void 0;
const moment_timezone_1 = __importDefault(require("moment-timezone"));
// Mengonversi tanggal ke UTC
const startOfDayUTCNow = moment_timezone_1.default.tz('Asia/Jakarta').startOf('day').toDate();
exports.startOfDayUTCNow = startOfDayUTCNow;
const endOfDayUTCNow = moment_timezone_1.default.tz('Asia/Jakarta').endOf('day').toDate();
exports.endOfDayUTCNow = endOfDayUTCNow;
