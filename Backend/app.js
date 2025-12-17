import express from "express";
import cookieParser from "cookie-parser";
import router from "./routes/auth.routes.js";

const app = express();

app.get("/", (req, res) => {
  res.send("Hi this is server");
});
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());
app.use("/api/auth", router);
export default app;
