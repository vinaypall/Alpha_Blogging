const {Schema,model} = require("mongoose");
const { createHmac,randomBytes } = require("crypto");
const { error } = require("console");
const {createTokenforuser} = require("../services/auth");


const userSchema =  new Schema({
    fullName:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    salt:{
        type:String,
    },
    password:{
        type:String,
        require:true
    },
    profileImageURL:{
        type:String,
        default:"Public\Images\Men.png",
    },
    role:{
        type:String,
        enum:["USER","ADMIN"],
        default:"USER",
    }
},
{
    timestamps:true
}
);

// Hashing a password using crypto
userSchema.pre("save", function (next){
    const user = this;
    if(!user.isModified("password")){
        return;
    }
    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac("sha256",salt)
                            .update(user.password)
                            .digest("hex");
    this.salt=salt;
    this.password=hashedPassword;
    next();
});

userSchema.static("matchPasswordAndGenerateToken",async function(email,password){
    const user = await this.findOne({email});
    if(!user){
        throw new Error("user not found..");
    }
    
    const salt = user.salt;
    const hashedPassword = user.password;
    const userhashedPassword = createHmac("sha256",salt).update(password).digest("hex");
    if (hashedPassword !== userhashedPassword) {
        throw new Error("Incorrect Password.");
    }
    const token = createTokenforuser(user);
    return token;
});

const User = model("user",userSchema);



module.exports=User;