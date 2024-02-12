"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyjwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createjwt_1 = require("./createjwt");
function verifyjwt(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        res.status(401).json("Unauthorized Access");
    }
    else {
        try {
            const decodedToken = jsonwebtoken_1.default.verify(token, createjwt_1.secretkey);
            req.decodedToken = decodedToken;
            next();
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.verifyjwt = verifyjwt;
//# sourceMappingURL=verifyjwts.js.map