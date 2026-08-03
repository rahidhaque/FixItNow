import { configDotenv } from "dotenv";
import { env } from "process";

configDotenv();

export const config = {
  NODE_ENV: env.NODE_ENV!,
  PORT: env.PORT!,
  DATABASE_URL: env.DATABASE_URL!,
};
