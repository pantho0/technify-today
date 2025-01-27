import config from "../../config";
import { User } from "../user/user.model";
import { IUserLogin } from "./auth.interface";
import { createToken } from "./auth.utils";
import bcrypt from "bcrypt";

const loginUser = async (payload: IUserLogin) => {
  const user = await User.findOne({ email: payload.email }).select("+password");
  console.log(user);

  if (!(await User.isPasswordMatched(payload?.password, user!.password))) {
    throw new Error("Invalid credentials");
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
