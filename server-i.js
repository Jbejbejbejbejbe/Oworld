import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import cors from "cors";
const signup=express();
import dotenv from "dotenv";
dotenv.config();
const uri=process.env.MONGODBLINK;
const port=process.env.PORT;
const S=mongoose.Schema;
const aandp=new S({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    salt:{
        type:Number,
        required:true
    }
});
signup.use(cors());
signup.use(express.static("public"));
signup.use(express.json());
signup.use(express.urlencoded({extended:true}));
signup.use(express.text());
mongoose.connect(uri);
const checkas=mongoose.connection;
const AP=mongoose.model("AcAndPass",aandp);
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

checkas.on("error",function(){
    console.log("資料庫在確認帳號時連線失敗");
});
checkas.once("open",function(){

    console.log("資料庫在確認帳號時連線成功");
    console.log("資料庫連線成功");
    signup.listen(port,"0.0.0.0",()=>{
    console.log("checka啟動了");
    });

});

