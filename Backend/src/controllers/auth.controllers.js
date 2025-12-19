import { userModel } from "../models/user.model.js";
import { food_partner_model } from "../models/food.partner.js";
import {
  checkIfFoodpartnerExists,
  checkIfUserExists,
  checkPassword,
  createFoodPartner,
  createToken,
  createUser,
  hashPassword,
} from "../services/auth.services.js";
import jwt from "jsonwebtoken";

export const postregisterUser = async (req, res) => {
  try {   
    const { fullName, email, password } = req.body;
    

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await hashPassword(password);

    const user = await createUser({
      fullName,
      email,
      password: hashedPassword,
    });

    const token = createToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getregisterUser = (req, res) => {
  res.send("this is register page");
};

export const getUserLogin = (req, res) => {
  res.send("this is User Login page");
};

export const postUserLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await checkIfUserExists(email, password);
  if (!user) {
    res.status(400).json("Username or Password invalid ");
  }
  const token = createToken(user._id);
  res.cookie("token", token);
  res.status(200).json({
    message: "User logged in successfully",
    user: {
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
    },
  });
};

export const getUserLogout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "User logged out successfully",
  });
};

export const getRegisterFoodPartner = (req, res) => {
  res.send("this is Food Partner register page");
};

export const postRegisterFoodPartner = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const foodPartnerExists = await checkIfFoodpartnerExists(email);
    if (foodPartnerExists) {
      res.status(400).json({
        message: "Food Partner Already Exists",
      });
    }
    const hashedPassword = await hashPassword(password);
    const foodPartner = await createFoodPartner({
      name,
      email,
      password: hashedPassword,
    });

    const token = await createToken(foodPartner._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.status(201).json({
      message: `Food Partner registered Successfully`,
      foodPartner: {
        id: foodPartner._id,
        name: foodPartner.fullName,
        email: foodPartner.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getFoodPartnerLogin = (req, res) => {
  res.send("this is Food_partner Login page");
};

export const postFoodPartnerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const foodPartner = await checkIfFoodpartnerExists(email, password);

    const isPasswordValid = await checkPassword(email, password);
    if (!foodPartner || !isPasswordValid) {
      return res.status(400).json("Email or Password invalid");
    }

    const token = createToken(foodPartner._id);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });
    
    res.status(200).json({
      message: "Food partner logged in successfully",
      foodPartner: {
        _id: foodPartner._id,
        email: foodPartner.email,
        restaurantName: foodPartner.restaurantName,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};

export const getFoodPartnerLogout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "Food Partner logged out successfully",
  });
};
