import { Router } from "express";
import { summary } from "../controllers/dashboardController.js";

export const dashboardRouter = Router();
dashboardRouter.get("/summary", summary);
