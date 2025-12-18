import { food_partner_model } from "../models/food.partner.js";
import { userModel } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const authFoodpartnerMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "Please Login first",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const foodPartner = await food_partner_model.findById(decoded.id);
    req.foodPartner = foodPartner;
    next();
  } catch (error) {
    return res.status(401).json({
      message: `Please Login first`,
    });
  }
};

export const authUserMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "Please Login first",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const User = await userModel.findById(decoded._id);
    req.User = User;
    next();
  } catch (error) {
    return res.status(401).json({
      message: `Please Login first`,
    });
  }
};
