import morgan from "morgan";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import express from "express";
import helmet from "helmet";
import authRoutes from "../routes/auth.js";
import packageJson from "../package.json" assert { type: "json" };
import mongoose from "mongoose";
import userRoutes from "../routes/users.js";
import postRoutes from "../routes/posts.js";
import Users from "../models/User.js";
import Post from "../models/Post.js";
import cors from "cors";
import { users, posts } from "../data/index.js";
export const initMiddleWare = (app) => {
  morgan("tiny");
  dotenv.config();
  const __fileName = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__fileName);
  app.use(express.json());
  app.use(cors());
  app.use("/assets", express.static(path.join(__dirname, "public/assets")));
};

export const initRoutes = (app) => {
  const API_VERSION = `/api/v${packageJson.version}`;
  app.use(`${API_VERSION}/auth`, authRoutes);
  app.use(`${API_VERSION}/user`, userRoutes);
  app.use(`${API_VERSION}/posts`, postRoutes);
};

export const initDB = (app) => {
  const PORT = process.env.API_PORT;
  mongoose
    .connect(process.env.MONGO_URL)
    .then((data) => {
      // Users.insertMany(users);
      // Post.insertMany(posts);
      app.listen(PORT, () => console.log(`SERVER PORT: ${PORT}`));
    })
    .catch((err) => {
      console.log(err);
    });
};
