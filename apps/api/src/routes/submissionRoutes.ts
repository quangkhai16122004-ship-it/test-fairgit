import { Router } from "express";
import { requireRoles } from "../middlewares/requireRole.js";
import * as controller from "../controllers/submissionController.js";

export const submissionRouter = Router();
submissionRouter.get("/", controller.list);
submissionRouter.post("/", controller.create);
submissionRouter.patch("/:id/review", requireRoles(["supervisor", "admin"]), controller.review);
