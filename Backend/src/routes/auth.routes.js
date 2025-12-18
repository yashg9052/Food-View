import { Router } from "express";
const auth_router = Router();
import * as authcontrollers from "../controllers/auth.controllers.js";

auth_router
  .route("/user/register")
  .get(authcontrollers.getregisterUser)
  .post(authcontrollers.postregisterUser);

auth_router
  .route("/user/login")
  .get(authcontrollers.getUserLogin)
  .post(authcontrollers.postUserLogin);
auth_router
  .route("/user/logout")
  .get(authcontrollers.getUserLogout)
  
auth_router
  .route("/foodpartner/register")
  .get(authcontrollers.getRegisterFoodPartner)
  .post(authcontrollers.postRegisterFoodPartner);
auth_router
  .route("/foodpartner/login")
  .get(authcontrollers.getFoodPartnerLogin)
  .post(authcontrollers.postFoodPartnerLogin);
auth_router
  .route("/foodpartner/logout")
  .get(authcontrollers.getFoodPartnerLogout)
  
export default auth_router;
