import { Types } from "mongoose";

export interface IFollower {
  following: Types.ObjectId;
  followedBy: Types.ObjectId;
  createdAt: string;
}
