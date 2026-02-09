import { Router } from "express";
import * as controller from "../controllers/memberController.js";

export const memberRouter = Router();
memberRouter.get("/", controller.list);
memberRouter.post("/", controller.create);
memberRouter.patch("/:projectCode/rebalance", controller.rebalance);
