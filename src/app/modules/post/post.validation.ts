import { z } from "zod";
import { Types } from "mongoose";

const createPostValidationSchema = z.object({
  body: z.object({
    user: z.string().refine((val) => Types.ObjectId.isValid(val), {
      message: "Invalid user ID format",
    }),

    image: z
      .string({
        required_error: "Image URL is required",
      })
      .url("Invalid image URL format")
      .optional(),
    title: z
      .string({
        required_error: "Title is required",
      })
      .trim()
      .min(3, "Title must be at least 3 characters")
      .max(100, "Title cannot exceed 100 characters"),

    category: z
      .string({
        required_error: "Category is required",
      })
      .trim()
      .min(2, "Category must be at least 2 characters"),

    details: z
      .string({
        required_error: "Details are required",
      })
      .trim()
      .min(10, "Details must be at least 10 characters")
      .max(1000, "Details cannot exceed 1000 characters"),

    isPremium: z.boolean().optional().default(false),

    upVote: z
      .array(z.string().refine((val) => Types.ObjectId.isValid(val)))
      .optional()
      .default([]),

    downVote: z
      .array(z.string().refine((val) => Types.ObjectId.isValid(val)))
      .optional()
      .default([]),

    comments: z
      .array(z.string().refine((val) => Types.ObjectId.isValid(val)))
      .optional()
      .default([]),

    isDeleted: z.boolean().optional().default(false),
  }),
});

const updatePostValidationSchema = createPostValidationSchema.partial();

export const PostValidation = {
  createPostValidationSchema,
  updatePostValidationSchema,
};
