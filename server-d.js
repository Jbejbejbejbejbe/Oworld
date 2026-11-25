import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
const uri=process.env.MONGODBLINK;
const port=process.env.PORT;
const oclink=express.Router();
import {ocmodel as alldata} from "./server-c.js";
mongoose.connect(uri);
const status=mongoose.connection;
oclink.post("/api/characters",async(req,res)=>{
        const linkeddata=await alldata.find();
        res.type("application/json");
        res.send(JSON.stringify(linkeddata));
});
export {oclink as D};
status.on("error",function(){
    console.log("資料庫連線失敗");
});
status.once("open",function(){
    console.log("資料庫連線成功");
});
