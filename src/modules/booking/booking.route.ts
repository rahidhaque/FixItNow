import { Router } from "express";
import { addBooking, getBooking, getBookings } from "./booking.controller";
import auth from "../../middleware/auth";

const bookingRouter = Router();

bookingRouter.post("/", auth("CUSTOMER"), addBooking);
bookingRouter.get("/", auth("ADMIN"), getBookings);
bookingRouter.get("/:id", auth("ADMIN", "CUSTOMER"), getBooking);

export default bookingRouter;