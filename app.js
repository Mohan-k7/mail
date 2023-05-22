const express=require("express");
const bodyp=require("body-parser");
const mongoose=require("mongoose");
//const connect =require("connect");
const ejs=require("ejs");

const app=express();
app.use(bodyp.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine", "ejs");
//napp.engine('ejs', require('ejs').__express);

mongoose.connect("mongodb+srv://mohan:mohan@cluster0.yvc1agc.mongodb.net/MailDB?retryWrites=true&w=majority",{
       useNewUrlParser: true, 
    useUnifiedTopology: true
})
.then(db => console.log('DB is connected'))
.catch(err => console.log(err));

const mailSchema=new mongoose.Schema({
    FirstName:String,
    LastName:String,
    Email:{
        type:String,
        required:[true,'Enter email']
    }
});
const Data=mongoose.model("Data",mailSchema);
var nam;
app.get("/",function(req,res){
    res.render("home");
});
app.get("/suc",function(req,res){ 
    res.render("succ",{name: nam});
});
app.post("/",function(req,res){
    const email=req.body.email;
    nam=req.body.fname;
    const data=new Data({
         FirstName:req.body.fname,
         LastName:req.body.lname,
         Email:req.body.email
    });
    run()
    async function run(){
        const d=await Data.findOne({Email:email});
        if(d){
            res.render("fail");
        }else{
            data.save();
            res.redirect("/suc");
            //res.render("succ",{name:d.FirstName});
        }
    }
     
});

app.post("/fail",function(req,res){
    res.redirect("/");
});

app.listen(3000,function(){
    console.log("server is running");
})



