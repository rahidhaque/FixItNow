import { Router } from "express";
import auth from "../../middleware/auth";
import { putProfile } from "./profile.controller";


const profileRouter = Router();

profileRouter.put("/profile", auth("TECHNICIAN"), putProfile);

export default profileRouter;