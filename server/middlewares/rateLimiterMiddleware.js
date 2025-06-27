import rateLimit from "express-rate-limit";

// OTP requests: max 5 per 15 minutes
export const otpRequestLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per window
  message: {
    message: "Too many OTP requests. Please try again after 15 minutes.",
  },
  standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false,
});

// Login attempts: max 10 per 15 minutes
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    message: "Too many login attempts. Try again later.",
  },
});
