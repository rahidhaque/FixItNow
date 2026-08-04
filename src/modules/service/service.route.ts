import { Router } from "express";
import { addService, getServices } from "./service.controller";
import auth from "../../middleware/auth";

export const serviceRouter = Router();

serviceRouter.post("/service", auth("TECHNICIAN"), addService);
serviceRouter.get("/services", getServices);
