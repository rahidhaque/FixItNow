import { Router } from "express";
import { addCategory, getCategory } from "./category.controller";
import auth from "../../middleware/auth";

const categoryRouter = Router();

categoryRouter.post("/", auth("ADMIN"), addCategory);
categoryRouter.get("/",  getCategory);

export default categoryRouter;