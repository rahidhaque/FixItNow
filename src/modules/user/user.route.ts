import { Router } from "express";
import { getTechnicians, getUsers } from "./user.controller";
import auth from "../../middleware/auth";

export const userRouter = Router();

userRouter.get("/technicians", getTechnicians);
userRouter.get("/all-users", auth("ADMIN"), getUsers);