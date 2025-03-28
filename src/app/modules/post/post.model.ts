import { model, Schema } from "mongoose";
import { IPost } from "./post.interface";

const postSchema = new Schema<IPost>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    image: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    upVote: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    downVote: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    comments: {
      type: [Schema.Types.ObjectId],
      ref: "Comment",
      default: [],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

postSchema.pre("find", async function () {
  this.find({ isDeleted: { $ne: true } });
});

postSchema.pre("findOne", async function () {
  this.find({ isDeleted: { $ne: true } });
});

export const Post = model<IPost>("Post", postSchema);
