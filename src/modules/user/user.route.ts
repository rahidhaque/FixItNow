import { Router } from "express";
import { getTechnicians } from "./user.controller";

export const userRouter = Router();

userRouter.get("/technicians", getTechnicians);