require("dotenv").config();

const express = require("express");
const path = require("path");
const userRoute = require("./routes/user");
const blogRouter = require("./routes/blog");
const Blogs = require("./models/blog")
const { connectToMongodb } = require("./connection");
const cookieParser = require("cookie-parser");
const {checkForAuthentication} = require("./middleware/auth")

connectToMongodb(process.env.MONGO_URL).then(()=>{
    console.log("Mongodb connected successfully...") 
})

const app = express();
const port = process.env.PORT||8000;

app.use(express.urlencoded({
    extended:false
}));



app.set("view engine","ejs");
app.set("views",path.resolve("./views"));
app.use(cookieParser());
app.use(checkForAuthentication("token"));

app.use(express.static(path.resolve('./public')));

app.get("/",async (req,res)=>{
    const allBlogs = await Blogs.find({});
    res.render("home.ejs",{
        user:req.user,
        blogs:allBlogs
    });
})
// app.get("/", async (req, res) => {
//     try {
//         // Fetch all blogs from the database
//         const allBlogs = await Blogs.find({});
        
//         // Render the home page with user and blog data
//         res.render("home.ejs", {
//             user: req.user || null, // Ensure user is null if not authenticated
//             blogs: allBlogs
//         });
//     } catch (error) {
//         // Log the error for debugging
//         console.error("Error fetching blogs:", error);
        
//         // Render an error page or redirect to an error route
//         res.status(500).render("error.ejs", {
//             message: "Unable to retrieve blogs at this moment. Please try again later."
//         });
//     }
// });

// app.get("/",(req,res)=>{
//     res.send("hello world"); 
// });

app.use("/user",userRoute);
app.use("/blog",blogRouter);

app.listen(port,()=>{
    console.log(`server started at ${port}...`)
})
