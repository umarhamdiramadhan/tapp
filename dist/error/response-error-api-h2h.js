"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseErrorApiH2h = void 0;
class ResponseErrorApiH2h extends Error {
    constructor(message) {
        super(message);
        this.message = message;
    }
}
exports.ResponseErrorApiH2h = ResponseErrorApiH2h;
