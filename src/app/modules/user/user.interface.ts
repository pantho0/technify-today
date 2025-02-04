import { Model, Types } from "mongoose";
import { USER_ROLE } from "./user.const";

export interface IUser {
  _id?: Types.ObjectId;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  password: string;
  passwordChangedAt?: Date;
  role?: "admin" | "user";
  profileImage?: string;
  following?: Types.ObjectId[] | [];
  followedBy?: Types.ObjectId[] | [];
  isPremium?: boolean;
  isBlocked?: boolean;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserModel extends Model<IUser> {
  isUserExists(email: string): Promise<IUser | null>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;

  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimeStamp: Date,
    jwtIssuedTimeStamp: number,
  ): boolean;
}

export type TUserRole = keyof typeof USER_ROLE;
