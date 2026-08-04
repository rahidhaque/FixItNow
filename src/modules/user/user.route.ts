import { Router } from "express";
import { getTechnicians, getUsers, patchUserStatus } from "./user.controller";
import auth from "../../middleware/auth";

export const userRouter = Router();

userRouter.get("/technicians", getTechnicians);
userRouter.get("/all-users", auth("ADMIN"), getUsers);
userRouter.patch("/:id", auth("ADMIN"), patchUserStatus);