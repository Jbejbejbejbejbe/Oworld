import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const uri=process.env.MONGODBLINK;
const getdata=express.Router();
mongoose.connect(uri);
const status=mongoose.connection;
import {ocmodel} from "./server-c.js";
getdata.post("/api/useroc",async(req,res)=>{
    const usinguser=req.body;
    const alluseroc=await ocmodel.find({
        user:{$in:[usinguser]}
    }).select("picture user name");
    res.send(alluseroc);
});
export {getdata as J};
status.on("error",function(){
    console.log("資料庫連線失敗");
});
status.once("open",function(){
    console.log("資料庫連線成功");
});
