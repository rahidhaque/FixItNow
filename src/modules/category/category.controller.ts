import { catchAsync } from "../../utility/catchAsync";
import { sendResponse } from "../../utility/sendResponse";
import type { Request, RequestHandler, Response } from "express";
import { createCategory, listCategories } from "./category.service";

export const getCategory: RequestHandler = catchAsync(async (_req, res) => {
  const categories = await listCategories();
  sendResponse(res, { message: "Categories fetched", data: categories });
});


export const addCategory: RequestHandler = catchAsync(async (req, res) => {
  const category = await createCategory(req.body);

  sendResponse(res, {
    message: "Category created successfully",
    data: category,
  });
});