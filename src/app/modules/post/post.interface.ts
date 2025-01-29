import { Types } from "mongoose";

export interface IPost {
  user: Types.ObjectId;
  image: string;
  title: string;
  category: string;
  details: string;
  isPremium: boolean;
  upVote: number;
  downVote: number;
  comments: Types.ObjectId[];
  createdAt: string;
}
