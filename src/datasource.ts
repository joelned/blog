import "reflect-metadata"
import { DataSource } from "typeorm"


export const AppDataSource = new DataSource({
type: "mysql", 
host: "localhost", 
port: 3307,
username: "root", 
password: "ceiling", 
database: "blog", 
synchronize: true,
logging: true, 
entities: ["./Models/*.js"],
subscribers:[]
})

AppDataSource.initialize()
.then(()=>{
console.log("DataSource Initialized")
})
.catch((error)=>{
console.log(error)
})
