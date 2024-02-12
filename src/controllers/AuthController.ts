import { User } from '../Models/User';
import express,  {Router, Request, Response} from 'express'
import { AppDataSource } from '../datasource';
import bcrypt from "bcrypt"
import {createjwt} from '../middlewares/createjwt';
const authRouter = Router()
const repository = AppDataSource.getRepository(User)
const app = express()
app.use(express.json())

authRouter.post("/signup", async (req:Request, res:Response)=>{

try{
const hashedPassword = await bcrypt.hash(req.body.password, 10)
const newUser = {
username: req.body.username, 
password:hashedPassword
}
const isRegistered = await repository.findOne(
	{
	where:{
	username: newUser.username
	}
	}
)

if(isRegistered){
res.status(400).json("User Already Exists")
}

else{
await repository.save(newUser)
res.status(201).json("User Registered Successfully")
}

}
catch(error){
console.log(error)
}


} )


export default authRouter;

authRouter.post("/login", async (req:Request, res:Response)=> {
try{

const myUser ={
username: req.body.username, 
password: req.body.password

}
const isRegistered=  await  repository.findOne(
	{

	where:{
	username: myUser.username
	}
	})

if(isRegistered){

const isAuthenticated = await bcrypt.compare(myUser.password,isRegistered.password.toString())

if(isAuthenticated){
const token = createjwt({id: isRegistered.userId})

res.status(200).json({message: "Login Successful", accessToken: token})
}
else{
res.status(401).json("Invalid Credentials")
}
}
else{
res.status(401).json("Invalid Credentials")
}
}
catch(error){

console.log("Error: ",  error)
}


})

