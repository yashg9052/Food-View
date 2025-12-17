import { Router } from "express";
const router = Router();
import * as authcontrollers from "../controllers/auth.controllers.js";
router
  .route("/user/register")
  .get(authcontrollers.getregisterUser)
  .post(authcontrollers.postregisterUser);

router
  .route("/user/login")
  .get(authcontrollers.getUserLogin)
  .post(authcontrollers.postUserLogin);
router
  .route("/user/logout")
  .get(authcontrollers.getUserLogout)
  
router
  .route("/foodpartner/register")
  .get(authcontrollers.getRegisterFoodPartner)
  .post(authcontrollers.postRegisterFoodPartner);
router
  .route("/foodpartner/login")
  .get(authcontrollers.getFoodPartnerLogin)
  .post(authcontrollers.postFoodPartnerLogin);
router
  .route("/foodpartner/logout")
  .get(authcontrollers.getFoodPartnerLogout)
  
export default router;
