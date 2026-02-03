import { Router } from "express";
import * as controller from "../controllers/milestoneController.js";

export const milestoneRouter = Router();
milestoneRouter.get("/", controller.list);
milestoneRouter.post("/", controller.create);
milestoneRouter.patch("/:id/status", controller.setStatus);
