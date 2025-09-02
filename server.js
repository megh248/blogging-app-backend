import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bcrypt from "bcryptjs";

// Import Routes
import userRoutes from "./routes/user.js";
import blogRoutes from "./routes/blog.js";

dotenv.config();
const app = express();

// ✅ Middlewares
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// ✅ Debug log requests
app.use((req, res, next) => {
  next();
});

// ✅ Routes
app.use("/api/user", userRoutes);
app.use("/api", blogRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// ✅ DB connect
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Start server
app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});
