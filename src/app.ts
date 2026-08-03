import cookieParser from "cookie-parser";
import express, { type Application } from "express";
import { notFoundHandler } from "./middleware/notFound";
import { globalErrorHandler } from "./middleware/globalErrorHandler";
import authRouter from "./modules/auth/auth.route";
import categoryRouter from "./modules/category/category.route";

const app: Application= express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.get("/", (req,res) =>{
 res.send("Server is running on port");
})

app.use("/api/auth", authRouter);
app.use("/api/category", categoryRouter);

app.use(notFoundHandler);
app.use(globalErrorHandler);


export default app;