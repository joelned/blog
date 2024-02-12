import express, {Request, Router, Response} from "express"
import {AppDataSource} from "../datasource"
import {Post} from "../Models/Post"
import { verifyjwt } from "../middlewares/verifyjwts"

const app = express()
const blogRouter = Router()
const repository = AppDataSource.getRepository(Post)
blogRouter.post("/create-post", verifyjwt, async (req: Request, res:Response)=>{

try{
const Post = {
title: req.body.title, 
name: req.body.name, 
publicationDate: req.body.publicationDate,
category: req.body.category,
content: req.body.content
}
await repository.save(Post);
res.status(201).json("Posted Successfully");
}
catch(error){
console.log("Error: ", error);
}
})

blogRouter.get("/:title", verifyjwt, async(req:Request, res:Response)=>{
try{
const id = req.body.id; 
const isPresent = repository.findOne(
	{
		where:{
			postId: id
		}
	}
)
if(isPresent){
const Post = repository.findOneById(id);
res.status(200).json(Post);
}
else{
res.status(500).json("Post Not Found");
}
}
catch(error){
console.log("Error: "+ error);
}
})

blogRouter.delete('/{id}', verifyjwt, async (req:Request, res:Response)=>{
try{
const id = Number(req.body.id);
const isPresent = await repository.findOne({
where:{
postId: id

}
})
if(isPresent){
await repository.remove(isPresent);
res.json("Blog Post Deleted From Database");
}
else{
res.json("Post Not Found In Database");
}
}
catch(error){
console.log("Error: ", error);
}
}
)
