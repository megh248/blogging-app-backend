import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true,
      },
}, { timestamps: true });

const Blog = mongoose.model("blog", blogSchema);

export default Blog;