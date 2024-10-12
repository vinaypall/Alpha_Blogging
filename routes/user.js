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
    try {
        const token = await User.matchPasswordAndGenerateToken(email,password);
        return res.cookie("token",token).redirect("/");
    } catch (error) {
        return res.render("signin.ejs",{
            error:"Incorrect Password or Email"
        })
    }
});


module.exports = router