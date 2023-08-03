const express = require('express');
const path = require('path');
const cors = require('cors');
const { connectDb } = require('./connection');
const BlogPost = require('./model/blogPost');

const app = express();
const port = 8000;

//connet Database
connectDb()

//middleware
app.use(express.json());
app.use(cors());
app.use(express.static(path.resolve(__dirname, 'dist')))

//routes


//Route 1 : Post the blog
app.post("/post-blog", async (req, res) => {
    let blog = new BlogPost({
        title: req.body.title,
        description: req.body.description,
    })
    await blog.save();
    res.json({ message: "Blog post saved Successfully", blog })

})

//Route 2 : Get all the blogs
app.get("/get-blogs", async (req, res) => {
    let blogs = await BlogPost.find();
    if (!blogs) {
        res.status(404).json({ message: "No blogs found" })
    }
    res.json({ blogs })
})

//Route 3 : Get a deleted blog 
app.delete("/delete-blog/:id", async (req, res) => {
    let blog = await BlogPost.findByIdAndDelete(req.params.id);
    if (!blog) {
        res.status(404).json({ message: "Blog not found" })
    }
    res.status(200).json({ message: "Blog deleted successfully" })
})

//Route 4 : Update a blog 

app.put("/update-blog/:id", async (req, res) => {
    let blog = await BlogPost.findByIdAndUpdate(req.params.id);
    if (!blog) {
        res.status(404).json({ message: "Blog not found" })
    }

    if (!req.body.title && !req.body.description) {
        res.status(400).json({ message: "Please provide title and description" })
    } else if (!req.body.title) {
        blog.description = req.body.description
    } else if (!req.body.description) {
        blog.title = req.body.title
    } else {
        blog.title = req.body.title
        blog.description = req.body.description
    }

    await blog.save();
    res.status(200).json({ message: "Blog updted successfully"})
})

//listeners
app.listen(port, () => {
    console.log("The server is listening")
});