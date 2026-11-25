import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const lookoc=express();
lookoc.use(cors());
lookoc.use(express.static("public"));
lookoc.use(express.json());
lookoc.use(express.urlencoded({extended:true}));
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
    presonadj:{type:String},
    hobby:{type:String},
    ability:{type:String},
    story:{type:String},
    others:{type:String}
});
mongoose.connect(uri);
const status=mongoose.connection;
const ocmodel=mongoose.model("ocdatas",ocdata);
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
status.on("error",function(){
    console.log("資料庫連線失敗");
});
status.once("open",function(){
    console.log("資料庫連線成功");
    lookoc.listen(3012,"127.0.0.1",function(){
        console.log("在3012埠啟動了");
    });
});