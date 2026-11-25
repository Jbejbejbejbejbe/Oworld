import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const login=express().Router;
const uri=process.env.MONGODBLINK;
login.use(cors());
login.use(express.json());
login.use(express.static("public"));
const aandp=new mongoose.Schema({username:{
    type:String,
    required:true
},password:{
    type:String,
    required:true
},salt:{
    type:Number,
    required:true
}});
mongoose.connect(uri);
const themongoose=mongoose.connection;
const AP=mongoose.model("AcAndPass",aandp);
export {AP};
login.post("/api/checklogin",async(req,res)=>{
        try
        {
            const {username,password}=req.body;
            const theuserdata=await AP.find({
                username:{$in:[username]}
            });
            if(theuserdata.length===0)
            {
                res.type("text/plain");
                res.send("NOUSER");
            }
            else if(theuserdata.length===1)
            {
                let datasetpassword=theuserdata[0].password;
                let result=await bcrypt.compare(password,datasetpassword);
                if(result===true)
                {
                    res.type("text/plain");
                    res.send("SUCCESS");
                }
                else if(result===false)
                {
                    res.type("text/plain");
                    res.send("WRONG");
                }
            }
            
        }
        catch(error)
        {
            res.status(500).json({success:false,message:"失敗 "+error});
        }
});
export {login as F};
themongoose.on("error",function(){
    console.log("資料庫連線失敗");
});
themongoose.once("open",function(){
    console.log("資料庫連線成功");
});

