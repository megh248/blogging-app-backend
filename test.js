import express from "express";

const app = express();
app.use(express.json());

app.post("/test", (req, res) => {
  console.log("✅ Request reached server");
  res.json({ message: "Hello from backend" });
});

app.listen(5000, () => console.log("🚀 Test server running on port 5000"));
