import e, { response } from "express";

import {
  registerController,
  LoginController,
  forgetPasswordController,
} from "../controllers/authControllers.js";
import {
  RegisterValidation,
  LoginValidation,
  EmailValidation,
} from "../validations/authValidation.js";
import { 
    loginLimiter, 
    otpRequestLimiter 
} from "../middlewares/rateLimiterMiddleware.js";
import { sendOTPController, } from "../controllers/sendOTPController.js";
import { verifyOTPController } from "../controllers/verifyOTPController .js";

const authRouter = e.Router();

authRouter.post("/register", RegisterValidation, registerController);
authRouter.post("/login", loginLimiter, LoginValidation, LoginController);
authRouter.post("/forgot-password", EmailValidation, forgetPasswordController);
authRouter.post("/send-otp", otpRequestLimiter, sendOTPController);
authRouter.post("/verify-otp", verifyOTPController);


export default authRouter;
