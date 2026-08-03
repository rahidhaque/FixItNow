import { catchAsync } from "../../utility/catchAsync";
import type { Request, RequestHandler, Response } from "express";
import { sendResponse } from "../../utility/sendResponse";
import { AppError } from "../../utility/appError";
import { createBookingRequest, getBookingById, listBookings } from "./booking.service";
import { prisma } from "../../lib/prisma";


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

export const getBooking: RequestHandler = catchAsync(async (req, res) => {
  const bookingId = req.params.id as string;
  const booking = await getBookingById(bookingId);
  if (!booking) {
    throw new AppError(404, "Booking not found");
  }
  sendResponse(res, { message: "Booking fetched", data: booking });
});
