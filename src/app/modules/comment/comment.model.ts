import { model, Schema } from "mongoose";
import { IComment } from "./comment.interface";

const commentSchema = new Schema<IComment>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const Comment = model<IComment>("Comment", commentSchema);
