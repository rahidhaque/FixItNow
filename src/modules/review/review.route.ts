import { Router } from "express";
import auth from "../../middleware/auth";
import { postReview } from "./review.controller";

const reviewRouter = Router();

reviewRouter.post('/', auth("CUSTOMER"), postReview);

export default reviewRouter;