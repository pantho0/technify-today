import status from "http-status";
import config from "../../config";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { IUserLogin } from "./auth.interface";
import { createToken } from "./auth.utils";
import { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";

const loginUser = async (payload: IUserLogin) => {
  const user = await User.isUserExists(payload.email);

  if (!user) {
    throw new AppError(status.NOT_FOUND, "User not found");
  }

  if (!(await User.isPasswordMatched(payload?.password, user!.password))) {
    throw new AppError(status.BAD_REQUEST, "Invalid email or password");
  }

  const jwtPayload = {
    userId: user?._id,
    role: user?.role,
    email: user?.email,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_secret_exp as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_secret_exp as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

const changeUserPassIntoDB = async (
  userInfo: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  const user = await User.isUserExists(userInfo.email);

  if (!user) {
    throw new AppError(status.NOT_FOUND, "User not found");
  }
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(status.GONE, "User is deleted");
  }

  const isBlocked = user?.isBlocked;

  if (isBlocked) {
    throw new AppError(status.FORBIDDEN, "User is blocked");
  }

  if (!(await User.isPasswordMatched(payload.oldPassword, user.password))) {
    throw new AppError(status.UNAUTHORIZED, "Old password is incorrect");
  }

  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt),
  );

  await User.findOneAndUpdate(
    { email: userInfo.email, role: userInfo.role },
    { password: newHashedPassword, passwordChangedAt: new Date() },
  );

  return null;
};

export const AuthServices = {
  loginUser,
  changeUserPassIntoDB,
};
