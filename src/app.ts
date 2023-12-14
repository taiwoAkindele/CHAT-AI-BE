import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
config();
const app = express();

//middlewares
app.use(
  cors({
    credentials: true,
    origin: "https://chat-ai-frontend-one.vercel.app",
  })
);
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Origin",
    "https://chat-ai-frontend-one.vercel.app"
  );
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  next();
});

//remove it in production
app.use(morgan("dev"));

app.use("/api/v1", appRouter);

export default app;
