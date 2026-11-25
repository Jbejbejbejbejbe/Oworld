import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const uri=process.env.MONGODBLINK;
const ocdata=new mongoose.Schema({
    picture:{type:String},
    user:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    gender:{type:String},
    birthday:{type:String},
    personadj:{type:String},
    hobby:{type:String},
    ability:{type:String},
    story:{type:String},
    others:{type:String}
});
const getdata=express.Router();
mongoose.connect(uri);
const status=mongoose.connection;
const ocmodel=mongoose.model("ocdatas",ocdata);
getdata.post("/api/useroc",async(req,res)=>{
    const usinguser=req.body;
    const alluseroc=await ocmodel.find({
        user:{$in:[usinguser]}
    }).select("picture user name");
    res.send(alluseroc);
});
export getdata as J;
status.on("error",function(){
    console.log("資料庫連線失敗");
});
status.once("open",function(){
    console.log("資料庫連線成功");
});
