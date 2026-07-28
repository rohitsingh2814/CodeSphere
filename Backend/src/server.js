import express from "express";
import {ENV} from "./lib/env.js" ;


const app=express();
const PORT=ENV.PORT||3000;
app.get("/health",(req,res)=>{
    res.status(200).json({msg:"Success from backend"});
})

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
    
})
