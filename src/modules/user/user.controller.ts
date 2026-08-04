import type { RequestHandler } from "express";
import { catchAsync } from "../../utility/catchAsync";
import { sendResponse } from "../../utility/sendResponse";
import { listTechnicians, listUsers, updateUserStatus } from "./user.service";
import type { Status } from "../../../prisma/generated/prisma/enums";

export const getTechnicians: RequestHandler = catchAsync(async (_req, res) => {
  const technicians = await listTechnicians();
  sendResponse(res, { message: "Technicians fetched", data: technicians });
});


export const getUsers: RequestHandler = catchAsync(async (_req, res) => {
  const users = await listUsers();
  sendResponse(res, { message: "Users fetched", data: users });
});

export const patchUserStatus: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const user = await updateUserStatus(id as string, status as Status);

  sendResponse(res, {
    message: "User status updated successfully",
    data: user,
  });
});