import type { RequestHandler } from "express";
import { catchAsync } from "../../utility/catchAsync";
import { sendResponse } from "../../utility/sendResponse";
import { getTechnicianBookings, updateAvailability, updateBookingStatus, updateProfile } from "./profile.service";
import type { BookingStatus } from "../../../prisma/generated/prisma/enums";

export const putProfile: RequestHandler = catchAsync(async (req, res) => {
  const technicianId = req.user!.id;

  const profile = await updateProfile(technicianId, req.body);

  sendResponse(res, {
    message: "Profile updated successfully.",
    data: profile,
  });
});

export const putAvailability: RequestHandler = catchAsync(async (req, res) => {
  const technicianId = req.user!.id;
  const { availability } = req.body;

  const profile = await updateAvailability(
    technicianId,
    availability
  );

  sendResponse(res, {
    message: "Availability updated successfully.",
    data: profile,
  });
});

export const getBookings: RequestHandler = catchAsync(async (req, res) => {
  const technicianId = req.user!.id;

  const bookings = await getTechnicianBookings(technicianId);

  sendResponse(res, {
    message: "Bookings fetched successfully.",
    data: bookings,
  });
});

export const patchBookingStatus: RequestHandler = catchAsync(async (req, res) => {
  const technicianId = req.user!.id;

  const { id } = req.params;
  const { status } = req.body;

  const booking = await updateBookingStatus(
    id as string,
    technicianId,
    status as BookingStatus
  );

  sendResponse(res, {
    message: "Booking status updated successfully.",
    data: booking,
  });
});