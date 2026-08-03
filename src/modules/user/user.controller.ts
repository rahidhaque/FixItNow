import type { RequestHandler } from "express";
import { catchAsync } from "../../utility/catchAsync";
import { sendResponse } from "../../utility/sendResponse";
import { listTechnicians } from "./user.service";

export const getTechnicians: RequestHandler = catchAsync(async (_req, res) => {
  const technicians = await listTechnicians();
  sendResponse(res, { message: "Technicians fetched", data: technicians });
});
