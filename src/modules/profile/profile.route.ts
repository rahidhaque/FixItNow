import { Router } from "express";
import auth from "../../middleware/auth";
import { getBookings, putAvailability, putProfile } from "./profile.controller";


const profileRouter = Router();

profileRouter.put("/profile", auth("TECHNICIAN"), putProfile);
profileRouter.put("/availability", auth("TECHNICIAN"), putAvailability);
profileRouter.get("/bookings", auth("TECHNICIAN"), getBookings);

export default profileRouter;