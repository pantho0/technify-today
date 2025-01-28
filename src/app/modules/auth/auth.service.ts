import status from "http-status";
import config from "../../config";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { IUserLogin } from "./auth.interface";
import { createToken } from "./auth.utils";

const loginUser = async (payload: IUserLogin) => {
  const user = await User.findOne({ email: payload.email }).select("+password");

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

export const AuthServices = {
  loginUser,
};
