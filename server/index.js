import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import morgan from "morgan";
import path from "path";
import helmet from "helmet";
import { fileURLToPath } from "url";
import { register } from "./controllers/auth.js";
/* Configurations */
morgan("tiny");
dotenv.config();
const __fileName = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__fileName);
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use("/assets", express.static(path.join(__dirname, "public/assets")));
/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
// ROUTES WITH FILES
app.post("/auth/register", upload.single("picture"), register);

// MONGOOSE SETUP
const PORT = process.env.API_PORT;
mongoose
  .connect(process.env.MONGO_URL)
  .then((data) => {
    app.listen(PORT, () => console.log(`SERVER PORT: ${PORT}`));
  })
  .catch((err) => {
    console.log(err);
  });
