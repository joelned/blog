"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_1 = __importDefault(require("./controllers/AuthController"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/auth", AuthController_1.default);
app.listen(8080, () => {
    console.log("App is Listening on port 8080");
});
//# sourceMappingURL=index.js.map