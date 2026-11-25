import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const uri=process.env.MONGODBLINK;
const chatname=new mongoose.Schema({
    name:{
        type:String,
        required:true
    }
});
const ex=express();
ex.use(cors());
ex.use(express.text());
mongoose.connect(uri);
const status=mongoose.connection;
const worldmodel=mongoose.model("worldlist",chatname);
ex.post("/api/getworld",async(req,res)=>{
    try
    {
        const allworldname=await worldmodel.find();
        res.send(JSON.stringify(allworldname));
    }
    catch(error)
    {
        res.status(500).json({success:false,message:"失敗 "+error});
    }
    
});
ex.post("/api/setworld",async(req,res)=>{
    try
    {
        const thename=req.body;
        const save=new worldmodel({name:thename});
        await save.save();
        res.send("ok");
    }
    catch(error)
    {
        res.status(500).json({success:false,message:"失敗 "+error});
    }  
    
});
status.on("error",function(){
    console.log("資料庫連線失敗");
});
status.once("open",function(){
    console.log("資料庫連線成功");
    ex.listen(3011,"127.0.0.1",function(){
        console.log("search啟動於3011埠");
    });
});