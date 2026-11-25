import bcrypt from "bcrypt";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const savedata=express.Router();
const uri=process.env.MONGODBLINK;;
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
let save="";
savedata.use(cors());
savedata.use(express.static("public"));
savedata.use(express.json());
savedata.use(express.urlencoded({extended:true}));
mongoose.connect(uri);
const status=mongoose.connection;
const ocmodel=mongoose.model("ocdatas",ocdata);
export {ocmodel};
savedata.post("/api/savedata",async(req,res)=>{
    try
    {
        const reqdata=req.body;
        let datalist=[];
        let count=0;
        for(let [key,value] of Object.entries(reqdata))
        {
            datalist[count]=value;
            count=count+1;
        }
        if(count===10)
        {
            save=new ocmodel({picture:datalist[0],user:datalist[1].split("=")[1],name:datalist[2],gender:datalist[3],birthday:datalist[4],personadj:datalist[5],hobby:datalist[6],ability:datalist[7],story:datalist[8],others:datalist[9]});
        }
        else if(count===9)
        {
            save=new ocmodel({user:datalist[0].split("=")[1],name:datalist[1],gender:datalist[2],birthday:datalist[3],personadj:datalist[4],hobby:datalist[5],ability:datalist[6],story:datalist[7],others:datalist[8]}); 
        }
        else
        {
            console("取消上傳");
        }
        await save.save();
        res.send({success:true,message:"成功存進去了"});
    }
    catch(error)
    {
        res.status(500).json({success:false,message:"失敗 "+error});
    }
});
export {savedata as C};
status.on("error",function(){
    console.log("資料庫連線失敗");
});
status.once("open",function(){
    console.log("資料庫連線成功");
});
