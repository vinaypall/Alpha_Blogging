const express = require("express");
const path = require("path");
const userRoute = require("./routes/user");
const { connectToMongodb } = require("./connection");


connectToMongodb("mongodb://127.0.0.1:27017/AlphaBlogging").then(()=>{
    console.log("Mongodb connected successfully...") 
})

const app = express();
const port = 8000;

app.use(express.urlencoded({
    extended:false
}));

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.get("/",(req,res)=>{
    res.render("home.ejs")
})

app.use("/user",userRoute);


app.listen(port,()=>{
    console.log(`server started at ${port}...`)
})
