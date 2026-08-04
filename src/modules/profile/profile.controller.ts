import type { RequestHandler } from "express";
import { catchAsync } from "../../utility/catchAsync";
import { sendResponse } from "../../utility/sendResponse";
import { updateAvailability, updateProfile } from "./profile.service";

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