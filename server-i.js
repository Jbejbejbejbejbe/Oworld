import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import cors from "cors";
const signup=express.Router();
import dotenv from "dotenv";
dotenv.config();
const uri=process.env.MONGODBLINK;
const S=mongoose.Schema;
import {AP} from "./server-f.js";
mongoose.connect(uri);
const checkas=mongoose.connection;
signup.post("/api/checkaccount",async(req,res)=>{

        try
        {
            const needcheck=req.body;
            const allusers=await AP.find({
                username:{$in:[needcheck]}
            });
            if(allusers.length>0)
            {
                res.type("text/plain");
                res.send("USED");
            }
            else if(allusers.length===0)
            {
                res.type("text/plain");
                res.send("NEW");
            }
        }
        catch(error)
        {
            res.status(500).json({success:false,message:"確認失敗 "+error});
        }
    });
signup.post("/api/userdata",async(req,res)=>{
    try{
        const {username,password}=req.body;
        const salt=Math.floor(Math.random()*11);
        let hashresult=await bcrypt.hash(password,salt);
        let data=new AP({username,password:hashresult,salt});
        await data.save();
        res.send({status:true,message:"資料存入成功"});

    }
    catch(error){
        console.log(error);
        res.status(500).json({success:false,message:"失敗  "+error});
    }
});
export {signup as I};
checkas.on("error",function(){
    console.log("資料庫在確認帳號時連線失敗");
});
checkas.once("open",function(){

    console.log("資料庫在確認帳號時連線成功");
    console.log("資料庫連線成功");

});

