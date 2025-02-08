import { z } from "zod";

const userLoginValidatin = z.object({
  email: z.string({ required_error: "Email is required" }).email(),
  password: z.string({ required_error: "Password is required" }),
});

export const AuthValidationSchemas = {
  userLoginValidatin,
};
