"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../Models/User");
const express_1 = __importStar(require("express"));
const datasource_1 = require("../datasource");
const bcrypt_1 = __importDefault(require("bcrypt"));
const createjwt_1 = require("../middlewares/createjwt");
const authRouter = (0, express_1.Router)();
const repository = datasource_1.AppDataSource.getRepository(User_1.User);
const app = (0, express_1.default)();
app.use(express_1.default.json());
authRouter.post("/signup", async (req, res) => {
    try {
        const hashedPassword = await bcrypt_1.default.hash(req.body.password, 10);
        const newUser = {
            username: req.body.username,
            password: hashedPassword
        };
        const isRegistered = await repository.findOne({
            where: {
                username: newUser.username
            }
        });
        if (isRegistered) {
            res.status(400).json("User Already Exists");
        }
        else {
            await repository.save(newUser);
            res.status(201).json("User Registered Successfully");
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.default = authRouter;
authRouter.post("/login", async (req, res) => {
    try {
        const myUser = {
            username: req.body.username,
            password: req.body.password
        };
        const isRegistered = await repository.findOne({
            where: {
                username: myUser.username
            }
        });
        if (isRegistered) {
            const isAuthenticated = await bcrypt_1.default.compare(myUser.password, isRegistered.password.toString());
            if (isAuthenticated) {
                const token = (0, createjwt_1.createjwt)({ id: isRegistered.userId });
                res.status(200).json({ message: "Login Successful", accessToken: token });
            }
            else {
                res.status(401).json("Invalid Credentials");
            }
        }
        else {
            res.status(401).json("Invalid Credentials");
        }
    }
    catch (error) {
        console.log("Error: ", error);
    }
});
//# sourceMappingURL=AuthController.js.map