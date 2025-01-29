import { Types } from "mongoose";

export interface IFollower {
  follower: Types.ObjectId;
  followed: Types.ObjectId;
  createdAt: string;
}
