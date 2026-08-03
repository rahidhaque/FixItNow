import { Router } from "express";
import { addCategory, getCategory } from "./category.controller";
import auth from "../../middleware/auth";

const categoryRouter = Router();

categoryRouter.post("/", addCategory);
categoryRouter.get("/", auth("ADMIN"), getCategory);

export default categoryRouter;