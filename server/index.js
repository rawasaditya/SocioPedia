import express from "express";
import { initMiddleWare, initRoutes, initDB } from "./utils/serverUtils.js";

const app = express();
// Init middleware configurations
initMiddleWare(app);

// Initialize routes
initRoutes(app);

// MONGOOSE SETUP
initDB(app);
