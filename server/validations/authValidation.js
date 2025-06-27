import { z } from "zod";

const RegisterSchema = z.object({
  name: z.string().min(3, "Name should be at least 3 cherecter long"),
  email: z.string().min(6, "email should be 6 chercter long").email(),
  password: z.string().min(8, "Password Should be 8 and more cherecter"),
});

const LoginSchema = z.object({
  email: z.string().min(6, "email should be 6 chercter long").email(),
  password: z.string().min(8, "Password Should be 8 and more cherecter"),
});

const EmailSchema = z.object({
  email: z.string().min(6, "email should be 6 chercter long").email(),
});

export const RegisterValidation = (req, res, next) => {
  const validationResult = RegisterSchema.safeParse(req.body);

  if (!validationResult.success) {
    return res.status(400).json({
      message: "Invalid email or password",
      errors: validationResult.error.format(),
    });
  }
  next();
};

export const LoginValidation = (req, res, next) => {
  const validationResult = LoginSchema.safeParse(req.body);

  if (!validationResult.success) {
    return res.status(400).json({
      message: "Invalid email or password",
      errors: validationResult.error.format(),
    });
  }
  next();
};

export const EmailValidation = (req, res, next) => {
  const validationResult = EmailSchema.safeParse(req.body);

  if (!validationResult.success) {
    return res.status(400).json({
      message: "Invalid email or password",
      errors: validationResult.error.format(),
    });
  }
  next();
};
