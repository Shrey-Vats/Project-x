import e from "express";
import { authMiddleware } from "../middlewares/authMiddlewares.js";
import {
  userInformationController,
  userInformationEditController,
} from "../Controllers/userControllers.js";

const userRoute = e.Router();

userRoute.get("/me", authMiddleware, userInformationController);

userRoute.put("/me", authMiddleware, userInformationEditController);

userRoute.put("/me/reset-password", authMiddleware);

export default userRoute;
