import status from "http-status";
import AppError from "../../errors/AppError";
import { IUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async (payload: IUser) => {
  const isExist = await User.isUserExists(payload.email);

  if (isExist) {
    throw new AppError(status.BAD_REQUEST, "User already exists");
  }

  const result = await User.create(payload);
  return result;
};

const getAllUserFromDB = async () => {
  const result = await User.find().populate(["following", "followedBy"]);
  return result;
};

const getMeFromDB = async (id: string) => {
  const result = await User.findById(id);
  if (!result) {
    throw new AppError(status.NOT_FOUND, "User not found");
  }
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getMeFromDB,
};
