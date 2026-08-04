import { Router } from "express";
import auth from "../../middleware/auth";
import { getBookings, patchBookingStatus, putAvailability, putProfile } from "./profile.controller";


const profileRouter = Router();

profileRouter.put("/profile", auth("TECHNICIAN"), putProfile);
profileRouter.put("/availability", auth("TECHNICIAN"), putAvailability);
profileRouter.get("/bookings", auth("TECHNICIAN"), getBookings);
profileRouter.patch("/bookings/:id", auth("TECHNICIAN"), patchBookingStatus);

export default profileRouter;