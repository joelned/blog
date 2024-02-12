"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createjwt = exports.secretkey = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.secretkey = "fajslkdhfdjsfahuejkdfshamcx";
function createjwt(userpayload) {
    const expiresIn = '1h';
    const token = jsonwebtoken_1.default.sign(userpayload, exports.secretkey, { expiresIn });
    return token;
}
exports.createjwt = createjwt;
//# sourceMappingURL=createjwt.js.map