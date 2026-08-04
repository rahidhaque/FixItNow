import { Router } from "express";
import auth from "../../middleware/auth";
import { putAvailability, putProfile } from "./profile.controller";


const profileRouter = Router();

profileRouter.put("/profile", auth("TECHNICIAN"), putProfile);
profileRouter.put("/availability", auth("TECHNICIAN"), putAvailability);

export default profileRouter;