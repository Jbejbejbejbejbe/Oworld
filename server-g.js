import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const lookoc=express.Router();
const uri=process.env.MONGODBLINK;
import {ocmodel} from "./server-c.js"
mongoose.connect(uri);
const status=mongoose.connection;
lookoc.post("/api/readalldata",async(req,res)=>{
    try
    {
        const thedata=req.body;
        console.log(thedata.name);
        const thealldata=await ocmodel.find({
            user:{$in:[thedata.user]},
            name:{$in:[thedata.name]}
        });
        res.send(JSON.stringify(thealldata[0]));
    }
    catch(error)
    {
        res.status(500).json({success:false,message:"失敗 "+error.message});
    }
});
export {lookoc as G};
status.on("error",function(){
    console.log("資料庫連線失敗");
});
status.once("open",function(){
    console.log("資料庫連線成功");
});
