import { Router } from "express";
import { addBooking, getBooking, getBookings } from "./booking.controller";
import auth from "../../middleware/auth";

const bookingRouter = Router();

bookingRouter.post("/", auth("CUSTOMER"), addBooking);
bookingRouter.get("/", getBookings);
bookingRouter.get("/:id", getBooking);

export default bookingRouter;