import express from "express";
import jwt from "jsonwebtoken"
import Blog from "../models/Blog.js";

const router = express.Router();


router.post("/blog", async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: "Authorization header missing" });
        }
        const token = authHeader.split(" ")[1];
        console.log(token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.blog = decoded;
        const blog = await Blog.create(req.body);
        res.status(201).json({
            message: "Success",
            data: blog
        });
    } catch (e) {
        console.error(e);
        if (e.name === "JsonWebTokenError" || e.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Invalid or expired token" });
        }
        res.status(500).json({ message: "Server error" });
    }
});


router.get("/blog", async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.blog = decoded;
        const blogs = await Blog.find();
        res.status(200).json({
            message: "Success",
            data: blogs
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Server error" });
    }
})

export default router;