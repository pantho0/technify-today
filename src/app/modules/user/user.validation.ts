import { z } from "zod";
import { Types } from "mongoose";

const userValidationSchema = z.object({
  body: z.object({
    firstName: z
      .string({
        required_error: "First name is required",
      })
      .trim()
      .min(1, "First name cannot be empty"),

    middleName: z.string().trim().optional(),

    lastName: z
      .string({
        required_error: "Last name is required",
      })
      .trim()
      .min(1, "Last name cannot be empty"),

    email: z
      .string({
        required_error: "Email is required",
      })
      .email("Invalid email address"),

    password: z
      .string({
        required_error: "Password is required",
      })
      .min(6, "Password must be at least 6 characters")
      .max(30, "Password cannot be longer than 30 characters"),

    role: z.enum(["admin", "user"]).optional().default("user"),

    profileImage: z.string().optional(),

    following: z
      .array(z.string().refine((val) => Types.ObjectId.isValid(val)))
      .optional()
      .default([]),

    followedBy: z
      .array(z.string().refine((val) => Types.ObjectId.isValid(val)))
      .optional()
      .default([]),

    isPremium: z.boolean().optional().default(false),

    isBlocked: z.boolean().optional().default(false),

    isDeleted: z.boolean().optional().default(false),
  }),
});

export const userValidation = {
  userValidationSchema,
};
