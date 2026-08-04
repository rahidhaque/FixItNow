import type { RequestHandler } from "express";
import { catchAsync } from "../../utility/catchAsync";
import { sendResponse } from "../../utility/sendResponse";
import { createReview } from "./review.service";


export const postReview: RequestHandler = catchAsync(async (req, res) => {
  const customerId = req.user!.id;

  const review = await createReview(customerId, req.body);

  sendResponse(res, {
    message: "Review submitted successfully.",
    data: review,
  });
});