import { Types } from "mongoose";

export interface IComment {
  user: Types.ObjectId;
  postId: Types.ObjectId;
  comment: string;
  createdAt: string;
}
