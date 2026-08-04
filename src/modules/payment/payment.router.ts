import { Router } from "express";
import auth from "../../middleware/auth";
import { checkout, paymentHistory } from "./payment.controller";

const paymentRouter = Router();

paymentRouter.post("/checkout/:bookingId", auth("CUSTOMER"), checkout);
paymentRouter.get("/my-bookings", auth("CUSTOMER"), paymentHistory);

export default paymentRouter;