import { Router } from "express";
import { requireRoles } from "../middlewares/requireRole.js";
import * as controller from "../controllers/memberController.js";

export const memberRouter = Router();
memberRouter.get("/", controller.list);
memberRouter.post("/", requireRoles(["admin", "supervisor"]), controller.create);
memberRouter.patch("/:projectCode/rebalance", requireRoles(["admin", "supervisor"]), controller.rebalance);
