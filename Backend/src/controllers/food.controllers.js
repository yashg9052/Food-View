import { foodModel } from "../models/food.model.js";
import { v4 as uuid } from "uuid";
import * as storageService from "../storage/storage.services.js";

export const createFood = async (req, res) => {
  const fileUploadResult = await storageService.uploadFile(
    req.file.buffer,
    uuid()
  );
  console.log(req.body);
  const food = await foodModel.create({
    name: req.body.name,
    description: req.body.description,
    video: fileUploadResult.url,
    foodPartner: req.foodPartner._id,
  });
  res.status(201).json({
    message: "food created successfully",
    food: food,
  });
};

export const getFoodItems = async (req, res) => {
  const foodItems = await foodModel.find({});

  res.status(200).json({
    message: "Food items fetched successfully",
    foodItems,
  });
};
