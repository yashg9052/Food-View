import argon2, { hash } from "argon2";
import { userModel } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { food_partner_model } from "../models/food.partner.js";

export const hashPassword = async (password) => {
  try {
    const hashedPassword = await argon2.hash(password);
    return hashedPassword;
  } catch (error) {
    console.log("Hashed Password error ");
  }
};

export const createUser = async ({ fullName, email, password }) => {
  return await userModel.create({ fullName, email, password });
};

export const createToken = async (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};
export const checkIfUserExists = async (email, password) => {
  try {
    const user = await userModel.findOne({ email });

    if (!user) return null;
    const isPasswordValid = await argon2.verify(user.password, password);

    if (!isPasswordValid) return null;
    return user;
  } catch (error) {
    console.log("user exists error ", error);
  }
};

export const checkIfFoodpartnerExists = async (email) => {
  const foodPartner = await food_partner_model.findOne({ email });

  if (foodPartner) {
    return foodPartner;
  }
  return false;
};

export const checkPassword = async (email, password) => {
  const foodPartner = await food_partner_model.findOne({ email });
  const isPasswordValid = await argon2.verify(foodPartner.password, password);

  if (!isPasswordValid) return null;

  return true;
};

export const createFoodPartner = async (data) => {
  return await food_partner_model.create(data);
};
