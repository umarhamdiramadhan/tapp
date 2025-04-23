"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseErrorApi = void 0;
class ResponseErrorApi extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        this.message = message;
    }
}
exports.ResponseErrorApi = ResponseErrorApi;
