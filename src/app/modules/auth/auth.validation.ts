import { z } from "zod";

const userLoginValidatin = z.object({
  body: z.object({
    email: z.string({ required_error: "Email is required" }).email(),
    password: z.string({ required_error: "Password is required" }),
  }),
});

const resetPasswordValidation = z.object({
  body: z.object({
    email: z.string({ required_error: "Email is required" }).email(),
    newPassword: z.string({ required_error: "New password is required" }),
  }),
});

const forgetPasswordValidation = z.object({
  body: z.object({
    email: z.string({ required_error: "Email is required" }).email(),
  }),
});

const changePasswordValidation = z.object({
  body: z.object({
    oldPassword: z.string({ required_error: "Old password is required" }),
    newPassword: z.string({ required_error: "New password is required" }),
  }),
});

const refreshTokenValidation = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: "Refresh token is required",
    }),
  }),
});

export const AuthValidationSchemas = {
  userLoginValidatin,
  refreshTokenValidation,
  resetPasswordValidation,
  forgetPasswordValidation,
  changePasswordValidation,
};
