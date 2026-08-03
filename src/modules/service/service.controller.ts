import type { RequestHandler } from "express";
import { catchAsync } from "../../utility/catchAsync";
import { sendResponse } from "../../utility/sendResponse";
import { listServices } from "./service.service";

export const getServices: RequestHandler = catchAsync(async (_req, res) => {
  const services = await listServices();
  sendResponse(res, { message: "Services fetched", data: services });
});
