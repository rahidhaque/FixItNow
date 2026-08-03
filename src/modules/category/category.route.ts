import { Router } from "express";
import { addCategory, getCategory } from "./category.controller";

const categoryRouter = Router();

categoryRouter.post("/", addCategory);
categoryRouter.get("/", getCategory);

export default categoryRouter;