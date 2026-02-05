import { Router } from "express";
import * as controller from "../controllers/authController.js";

export const authRouter = Router();
authRouter.post("/login", controller.login);
authRouter.get("/me", controller.me);
