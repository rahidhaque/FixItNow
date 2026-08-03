import { Router } from "express";
import { addBooking } from "./booking.controller";
import auth from "../../middleware/auth";

const bookingRouter = Router();

bookingRouter.post("/", auth("CUSTOMER"), addBooking);

export default bookingRouter;