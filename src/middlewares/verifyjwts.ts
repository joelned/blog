import jwt from "jsonwebtoken"
import {Response, Request, NextFunction} from "express"
import { secretkey } from "./createjwt"

interface DecodedToken{
	id: Number,
	username: String

}

declare global{
	namespace Express{
		interface Request{
			decodedToken?: DecodedToken

		}

	}


}

export function verifyjwt(req:Request, res:Response, next: NextFunction){
const token = req.headers.authorization?.split(" ")[1]
if(!token){
res.status(401).json("Unauthorized Access")
}
else{
try{
const decodedToken = jwt.verify(token,secretkey) as DecodedToken 
req.decodedToken = decodedToken
next()

}
catch(error){
console.log(error)
}




}




}
