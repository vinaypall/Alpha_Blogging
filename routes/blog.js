const {Router} = require("express");4
const Blog = require("../models/blog")
const Comment = require("../models/comment")
const multer  = require("multer")
const router = Router();
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/uploads`))
    },
    filename: function (req, file, cb) {
     const fileName= `${Date.now()}-${file.originalname}`
     cb(null,fileName);
    }
})

const upload = multer({ storage: storage })


router.get("/add-new",(req,res)=>{
    return res.render("addblog.ejs",{
        user:req.user
    });
})

router.post("/",upload.single("CoverImage"),async (req,res)=>{
    const {title,body} = req.body;
   const blog = await Blog.create({
        body,
        title,
        createdBy:req.user._id,
        coverImageUrl:`/uploads/${req.file.filename}`
    })
    return res.redirect(`/blog/${blog._id}`);
})  


router.get("/:id",async(req,res)=>{
    const blog = await Blog.findById(req.params.id).populate("createdBy");
    const comments  = await Comment.find({blogId:req.params.id}).populate("createdBy");
    return res.render("blog.ejs",{
        user:req.user,
        blog,
        comments,
    })
})

router.post("/comment/:blogID",async(req,res)=>{
   await Comment.create({
        content:req.body.content,
        blogId:req.params.blogID,
        createdBy:req.user._id
    })
    return res.redirect(`/blog/${req.params.blogID}`)
});

module.exports = router;