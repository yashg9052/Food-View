import { Router } from "express";
const food_router = Router();
import * as authMiddleWares from "../middlewares/auth.middleware.js";
import * as foodControllers from "../controllers/food.controllers.js";

// creating protected api using middlewares
food_router.post(
  "/",
  authMiddleWares.authFoodpartnerMiddleware,
  foodControllers.createFood
);

// food_router
//   .route("/")
//   .get(
//     authMiddleWares.authFoodpartnerMiddleware,
//     foodControllers.getFoods
//   )
//   .post(
//     authMiddleWares.authFoodpartnerMiddleware,
//     foodControllers.createFood
//   );



export default food_router;
