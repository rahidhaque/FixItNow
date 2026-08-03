import { catchAsync } from "../../utility/catchAsync";
import { sendResponse } from "../../utility/sendResponse";
import type { Request, Response } from "express";
import { loginSchema, registerSchema } from "./auth.validation";
import { loginUser, registerUser } from "./auth.service";

export const register = catchAsync(async (req: Request, res: Response) => {
  const input = registerSchema.parse(req.body);

  const result = await registerUser(input);

  sendResponse(res, {
    message: "User Registered Successfully",
    data: { user: result },
  });
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const input = loginSchema.parse(req.body);

  const result = await loginUser(input);

  sendResponse(res, {
    message: "Login successful",
    data: {
      user: result.user,
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
    },
  });
});

export const me = catchAsync(async (req: Request, res: Response) => {
  sendResponse(res, {
    message: "My Profile fetched successfully",
    data: { user: req.user },
  });
});
