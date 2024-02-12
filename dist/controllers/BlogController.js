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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const datasource_1 = require("../datasource");
const Post_1 = require("../Models/Post");
const verifyjwts_1 = require("../middlewares/verifyjwts");
const app = (0, express_1.default)();
const blogRouter = (0, express_1.Router)();
const repository = datasource_1.AppDataSource.getRepository(Post_1.Post);
blogRouter.post("/create-post", verifyjwts_1.verifyjwt, async (req, res) => {
    try {
        const Post = {
            title: req.body.title,
            name: req.body.name,
            publicationDate: req.body.publicationDate,
            category: req.body.category,
            content: req.body.content
        };
        await repository.save(Post);
        res.status(201).json("Posted Successfully");
    }
    catch (error) {
        console.log("Error: ", error);
    }
});
blogRouter.get("/:title", verifyjwts_1.verifyjwt, async (req, res) => {
    try {
        const id = req.body.id;
        const isPresent = repository.findOne({
            where: {
                postId: id
            }
        });
        if (isPresent) {
            const Post = repository.findOneById(id);
            res.status(200).json(Post);
        }
        else {
            res.status(500).json("Post Not Found");
        }
    }
    catch (error) {
        console.log("Error: " + error);
    }
});
blogRouter.delete('/{id}', verifyjwts_1.verifyjwt, async (req, res) => {
    try {
        const id = Number(req.body.id);
        const isPresent = await repository.findOne({
            where: {
                postId: id
            }
        });
        if (isPresent) {
            await repository.remove(isPresent);
            res.json("Blog Post Deleted From Database");
        }
        else {
            res.json("Post Not Found In Database");
        }
    }
    catch (error) {
        console.log("Error: ", error);
    }
});
//# sourceMappingURL=BlogController.js.map