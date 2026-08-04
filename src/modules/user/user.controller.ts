import type { RequestHandler } from "express";
import { catchAsync } from "../../utility/catchAsync";
import { sendResponse } from "../../utility/sendResponse";
import { listTechnicians, listUsers } from "./user.service";

export const getTechnicians: RequestHandler = catchAsync(async (_req, res) => {
  const technicians = await listTechnicians();
  sendResponse(res, { message: "Technicians fetched", data: technicians });
});


export const getUsers: RequestHandler = catchAsync(async (_req, res) => {
  const users = await listUsers();
  sendResponse(res, { message: "Users fetched", data: users });
});