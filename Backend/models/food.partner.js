import mongoose from "mongoose";

const food_partner_schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const food_partner_model = mongoose.model("Food-Partner",food_partner_schema)