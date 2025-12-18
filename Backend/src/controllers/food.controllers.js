import { foodModel } from "../models/food.model.js";

export const createFood = (req, res) => {
  console.log(req.foodPartner);
  res.send("food item created");
};
