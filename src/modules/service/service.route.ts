import { Router } from "express";
import { addService, getServices } from "./service.controller";

export const serviceRouter = Router();

serviceRouter.post("/service", addService);
serviceRouter.get("/services", getServices);