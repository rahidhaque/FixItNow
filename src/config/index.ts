import { configDotenv } from "dotenv";
import { env } from "process";

configDotenv();

export const config = {
  NODE_ENV: env.NODE_ENV!,
  PORT: env.PORT!,
  DATABASE_URL: env.DATABASE_URL!,
  JWT_ACCESS_SECRET: env.JWT_ACCESS_SECRET!,
  JWT_REFRESH_SECRET: env.JWT_REFRESH_SECRET!
};
