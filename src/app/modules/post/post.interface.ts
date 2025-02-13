import { Types } from "mongoose";

export interface IPost {
  user: Types.ObjectId;
  image?: string;
  title: string;
  category: string;
  details: string;
  isPremium: boolean;
  upVote: Types.ObjectId[];
  downVote: Types.ObjectId[];
  comments: Types.ObjectId[];
  isDeleted: boolean;
  createdAt: string;
}

export interface ICredentials {
  userId: string;
  role: string;
  email: string;
  iat: number;
  exp: number;
}
