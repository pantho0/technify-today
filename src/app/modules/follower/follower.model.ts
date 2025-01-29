import { model, Schema } from "mongoose";
import { IFollower } from "./follower.interface";

const followerSchema = new Schema<IFollower>(
  {
    follower: { type: Schema.Types.ObjectId, ref: "User" }, //suppose user a follow user b so here will be user b _id
    followed: { type: Schema.Types.ObjectId, ref: "User" }, // and user b is followe by user a so here will be user a _id
  },
  {
    timestamps: true,
  },
);

export const Follower = model<IFollower>("Follower", followerSchema);
