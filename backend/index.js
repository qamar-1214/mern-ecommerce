import express, { urlencoded } from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import router from "./routes/index.js";
import cookieParser from "cookie-parser";
import path from "path";
// Create a __dirname equivalent
const __dirname = path.dirname(new URL(import.meta.url).pathname);
dotenv.config();
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
// Serve static files (uploaded images)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const port = process.env.PORT || 4000;

app.use(express.json());
app.use(urlencoded({ extended: true }));

//routes
app.use("/api", router);

connectDB().then(() => {
  app.listen(port, () => {
    console.log("Database is connected.");
    console.log(`Server is running on port ${port}`);
  });
});
