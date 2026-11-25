import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
const uri=process.env.MONGODBLINK;
const port=process.env.PORT;
const oclink=express.Routers();
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
    ability:{type:String},
    hobby:{type:String},
    story:{type:String},
    others:{type:String}
});
mongoose.connect(uri);
const status=mongoose.connection;
const alldata=mongoose.model("ocdatas",ocdata);
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
