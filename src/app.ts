import cookieParser from "cookie-parser";
import express, { type Application } from "express";
import { notFoundHandler } from "./middleware/notFound";
import { globalErrorHandler } from "./middleware/globalErrorHandler";

const app: Application= express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.get("/", (req,res) =>{
 res.send("Server is running on port");
})

app.use(globalErrorHandler);
app.use(notFoundHandler);

export default app;