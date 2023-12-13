import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
config();
const app = express();

const corsConfig = {
  credentials: true,
  origin: "https://chat-ai-frontend-one.vercel.app",
} || { credentials: true, origin: "http://localhost:5173" };

//middlewares
app.use(cors(corsConfig));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

//remove it in production
app.use(morgan("dev"));

app.use("/api/v1", appRouter);

export default app;
