import { Router } from "express";
import * as controller from "../controllers/projectController.js";

export const projectRouter = Router();
projectRouter.get("/", controller.list);
projectRouter.post("/", controller.create);
projectRouter.patch("/:code/progress", controller.setProgress);
