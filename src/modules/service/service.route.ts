import { Router } from "express";
import { getServices } from "./service.controller";

export const serviceRouter = Router();

serviceRouter.get("/services", getServices);