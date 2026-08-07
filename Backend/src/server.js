import express from "express";
import path from "path";
import fs from "fs";
import cors from "cors";
import {serve} from "inngest/express";
import {connectDB} from './lib/db.js';
import { ENV } from "./lib/env.js";
import { inngest } from "./lib/inngest.js";




const app = express();

//middleware 
app.use(express.json());

//credentials:true meaning ?? => server allows a browser to include cookies on req   
app.use(cors({origin:ENV.CLIENT_URL,credentials:true}))

app.use("/api/inngest",serve({client:inngest,functions})); 

const root = path.resolve();

const frontendPath = path.join(process.cwd(), "..", "Frontend", "dist");
console.log(process.cwd());

const PORT = ENV.PORT || 3000;

app.get("/health", (req, res) => {
    res.json({ msg: "Success from backend" });
});

if (ENV.NODE_ENV === "production") {
    app.use(express.static(frontendPath));

    app.get("/{*any}", (req, res) => {
        res.sendFile(path.join(frontendPath, "index.html"));
    });
}



const startServer=async ()=>{
    try{
        connectDB();
        app.listen(PORT, () => {
            console.log(`Server running on ${PORT}`);
        });
    }catch(error){
        console.log("💥 Error in starting Server" ,error);
    }


}

startServer();