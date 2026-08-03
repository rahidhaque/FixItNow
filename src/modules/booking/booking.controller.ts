import { catchAsync } from "../../utility/catchAsync";
import type { Request, RequestHandler, Response } from "express";
import { sendResponse } from "../../utility/sendResponse";
import { AppError } from "../../utility/appError";
import { createBookingRequest, listBookings } from "./booking.service";

export const addBooking = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new AppError(401, "Unauthorized");
}
  const booking = await createBookingRequest(req.user.id, req.body);
  sendResponse(res, {
    statusCode: 201,
    message: "Booking request submitted",
    data: booking,
  });
});


export const getBookings: RequestHandler = catchAsync(async (_req, res) => {
  const bookings = await listBookings();
  sendResponse(res, { message: "Bookings fetched", data: bookings });
});
