const {Router} = require("express");
const User = require("../models/user");
const {createTokenforuser} = require("../services/auth")
const router = Router();

router.get("/signin",(req,res)=>{
    return res.render("signIn");
})
router.get("/signup",(req,res)=>{
    return res.render("signUp");
});

router.post("/signup",async(req,res)=>{
    const {fullName,email,password} = req.body;
    try {
        await User.create({
            fullName,
            email,
            password
        });
    } catch (error) {
        return res.render("signUp.ejs",{
            error:"Email Already Exists"
        });
    }
    const token = await User.matchPasswordAndGenerateToken(email,password);
    return res.cookie("token",token).redirect("/");
   
})

router.post("/signin",async(req,res)=>{
    const {email,password}= req.body;
    try {
        const token = await User.matchPasswordAndGenerateToken(email,password);
        return res.cookie("token",token).redirect("/");
    } catch (error) {
        return res.render("signIn.ejs",{
            error:"Incorrect Password or Email"
        })
    }
});

router.get("/logout",(req,res)=>{
    res.clearCookie("token").redirect("/");
})

module.exports = router
