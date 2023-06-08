import connectionDB from "./config/database.js";
import dotenv from "dotenv";
import app from './app.js'

//Settings
dotenv.config({ path: "./config/config.env" });

//Database Connection
connectionDB();

//Listen to the port
app.listen(4200,()=>{
    console.log(`Server at port:4200 in mode ${process.env.MODE}`);
})


 