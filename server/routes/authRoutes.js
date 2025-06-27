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

const authRouter = e.Router();

authRouter.post("/register", RegisterValidation, registerController);

authRouter.post("/login", LoginValidation, LoginController);

authRouter.post("/forgot-password", EmailValidation, forgetPasswordController);

export default authRouter;
