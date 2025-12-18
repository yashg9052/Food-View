import express from "express";
import cookieParser from "cookie-parser";
import auth_router from "./src/routes/auth.routes.js";
import food_router from "./src/routes/food.routes.js";

const app = express();

app.get("/", (req, res) => {
  res.send("Hi this is server");
});
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());
app.use("/api/auth", auth_router);
app.use("/api/food",food_router);
export default app;
