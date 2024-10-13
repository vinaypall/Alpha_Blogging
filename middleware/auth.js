const {validateToken} = require("../services/auth")

function checkForAuthentication(cookieName) {
    
    return (req,res,next)=>{
        const tokenValue = req.cookies[cookieName];
        if(!tokenValue){
           return next();
        }
        //Validate
       try {
        const userPayLoad = validateToken(tokenValue);
        req.user = userPayLoad;
       } catch (error) {}
       return next();   
    }
}

module.exports = {
    checkForAuthentication,
};