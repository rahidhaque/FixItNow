import type { UserJwtPayload } from "../utility/jwt";
import {Role} from "../../prisma/generated/prisma/enums";

declare global {
  namespace Express {
    interface Request {
      user?: UserJwtPayload;
    }
  }
}

export {};