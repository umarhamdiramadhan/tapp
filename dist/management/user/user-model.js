"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toUserResponse = toUserResponse;
var Status;
(function (Status) {
    Status[Status["administrator"] = 0] = "administrator";
    Status[Status["admin"] = 1] = "admin";
    Status[Status["cs"] = 2] = "cs";
    Status[Status["operator"] = 3] = "operator";
})(Status || (Status = {}));
function toUserResponse(user) {
    return {
        email: user.email,
        name: user.name,
        role: user.role,
        is_aktif: user.is_aktif
    };
}
