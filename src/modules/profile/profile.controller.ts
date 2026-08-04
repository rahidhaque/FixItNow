import type { RequestHandler } from "express";
import { catchAsync } from "../../utility/catchAsync";
import { sendResponse } from "../../utility/sendResponse";
import { updateProfile } from "./profile.service";

export const putProfile: RequestHandler = catchAsync(async (req, res) => {
  const technicianId = req.user!.id;

  const profile = await updateProfile(technicianId, req.body);

  sendResponse(res, {
    message: "Profile updated successfully.",
    data: profile,
  });
});