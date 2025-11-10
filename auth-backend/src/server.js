import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req,res)=> res.json({ status:"ok", message:"Activity 1 Auth API running" }));
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 4000;
connectDB(process.env.MONGO_URI).then(()=>{
  app.listen(PORT, ()=> console.log(`🚀 Server running on http://localhost:${PORT}`));
});
