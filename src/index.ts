import express, {Request, Response} from "express"
import authRouter from "./controllers/AuthController"


const app = express()
app.use(express.json())

app.use("/api/auth", authRouter)
app.listen(8080, ()=>{
console.log("App is Listening on port 8080")
})


