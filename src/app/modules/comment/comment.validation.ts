import { z } from "zod";
import { Types } from "mongoose";

export const CommenValidationtSchema = z.object({
  user: z.custom<Types.ObjectId>((val) => Types.ObjectId.isValid(val), {
    message: "Invalid user ID",
  }),
  postId: z.custom<Types.ObjectId>((val) => Types.ObjectId.isValid(val), {
    message: "Invalid post ID",
  }),
  comment: z.string().min(1, "Comment cannot be empty"),
  createdAt: z.string().datetime({ message: "Invalid date format" }),
});

export const CommentValidation = {
  CommenValidationtSchema,
};
