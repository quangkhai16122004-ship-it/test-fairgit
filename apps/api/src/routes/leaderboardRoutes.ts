import { Router } from "express";
import * as controller from "../controllers/leaderboardController.js";

export const leaderboardRouter = Router();
leaderboardRouter.get("/", controller.list);
