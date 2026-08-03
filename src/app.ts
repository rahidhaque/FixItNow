import cookieParser from "cookie-parser";
import express, { type Application } from "express";

const app: Application= express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.get("/", (req,res) =>{
 res.send("Server is running on port");
})

export default app;