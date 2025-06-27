import e from "express";
import authRouter from "./routes/authRoutes.js";
import userRoute from "./routes/userRoutes.js";

import cookieParser from "cookie-parser";

const app = e();

app.use(e.json());
app.use(cookieParser());

app.use("/api/auth/", authRouter);
app.use("/app/user/", userRoute);

export default app;
