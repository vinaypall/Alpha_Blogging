const {Router} = require("express");
const User = require("../models/user");

const router = Router();

router.get("/signin",(req,res)=>{
    return res.render("signIn");
})
router.get("/signup",(req,res)=>{
    return res.render("signUp");
});

router.post("/signup",async(req,res)=>{
    const {fullName,email,password} = req.body; 
    await User.create({
        fullName,
        email,
        password
    });
    return res.redirect("/"); 
})

router.post("/signin",async(req,res)=>{
    const {email,password}= req.body;
    const result = await User.matchPassword(email,password);
    console.log(result);
    // console.log("User",result);
    return res.redirect("/");
});


module.exports = router