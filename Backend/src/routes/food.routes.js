import { Router } from "express";
import * as authMiddleWares from "../middlewares/auth.middleware.js";
import * as foodControllers from "../controllers/food.controllers.js";
import multer from "multer";
const food_router = Router();


const upload = multer({
  storage:multer.memoryStorage(),
})
// creating protected api using middlewares for food-partner
food_router.post(
  "/",
  authMiddleWares.authFoodpartnerMiddleware,upload.single("video"),
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

// routing for user
food_router.get("/",authMiddleWares.authUserMiddleware,foodControllers.getFoodItems)


export default food_router;
