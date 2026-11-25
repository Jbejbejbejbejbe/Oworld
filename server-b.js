import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const uri=process.env.MONGODBLINK;
const port=process.env.PORT;
const ex=express.Router();
import {ocmodel} from "./server-c.js";
const message=new mongoose.Schema({
    picture:{type:String},
    speaker:{
        type:String,
        required:true
    },
    useroroc:{
        type:String,
        required:true
    },
    world:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    }
});
mongoose.connect(uri);
const status=mongoose.connection;
const chatmodel=mongoose.model("chatlist",message);
export {chatmodel};
let user="";
ex.post("/api/allchat",async(req,res)=>{
    try
    {
        const inworld=req.body;
        let newphoto=[];
        const allchatdata=await chatmodel.find({
            world:{$in:[inworld.world]}
        });
        for(let i=0;i<=allchatdata.length-1;i=i+1)
        {
            if(allchatdata[i].picture===undefined&&allchatdata[i].useroroc==="oc")
            {
                newphoto[i]=await ocmodel.find({
                    user:{$in:[inworld.user]},
                    name:{$in:[allchatdata[i].speaker]}
                }).select("picture");
                console.log(newphoto[i][0].picture);
                if(newphoto[i][0].picture!=="")
                {
                    await chatmodel.updateMany({speaker:{$in:[allchatdata[i].speaker]}},{$set:{picture:newphoto[i][0].picture}});
                }
            }
        }
        
        res.send(JSON.stringify(allchatdata));
    }
    catch(error)
    {
        res.status(500).json({success:false,message:"失敗 "+error});
    }
});
ex.post("/api/allspeakers",async(req,res)=>{
    try
    {
        user=req.body;
        const allspeakers=await ocmodel.find({
            user:{$in:[user]}
        }).select("name");
        allspeakers.unshift({name:user});
        res.send(JSON.stringify(allspeakers));
    }
    catch(error)
    {
        res.status(500).json({success:false,message:"失敗 "+error});
    }
});
ex.post("/api/sendchat",async(req,res)=>{
    try
    {
        const thereq=req.body;
        let uoro="";
        let save="";
        let user=thereq.user;
        let speakerpicture="";
        if(thereq.speaker===user)
        {
            uoro="user";
        }
        else if(thereq.speaker!==user)
        {
            uoro="oc";
            speakerpicture=await ocmodel.find({
                user:{$in:[user]},
                name:{$in:[thereq.speaker]}
            }).select("picture");
        }
        if(thereq.speaker!==user&&speakerpicture[0].picture!=="")
        {
            
            save=new chatmodel({picture:speakerpicture[0].picture,speaker:thereq.speaker,useroroc:uoro,world:thereq.world,message:thereq.message});
        }
        else
        {
            save=new chatmodel({speaker:thereq.speaker,useroroc:uoro,world:thereq.world,message:thereq.message});
        }
        await save.save();
        res.json({success:true,message:"已記錄"});
    }
    catch(error)
    {
        res.status(500).json({success:false,message:"失敗 "+error});
    }
});
export {ex as B};
status.on("error",function(){
    console.log("資料庫連線失敗");
});
status.once("open",function(){
    console.log("資料庫連線成功");
})
