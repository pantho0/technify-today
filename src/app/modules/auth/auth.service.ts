import status from "http-status";
import config from "../../config";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { IUserLogin } from "./auth.interface";
import { createToken, verifyToken } from "./auth.utils";
import { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { sendEmail } from "../../utils/sendEMail";
import jwt from "jsonwebtoken";
import { IUser } from "../user/user.interface";
import { IResponse, ISocialLoginUser } from "../../interface";

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
    image: user?.profileImage,
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

const socialLoginUser = async (payload: ISocialLoginUser) => {
  let user = await User.isUserExists(payload.email);

  if (!user) {
    const result = await User.create(payload);
    user = (result as IResponse)?.data as IUser;
  }

  const jwtPayload = {
    userId: user?._id,
    role: user?.role,
    email: user?.email,
    image: user?.profileImage,
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

const forgetPassword = async (payload: { email: string }) => {
  const user = await User.isUserExists(payload.email);
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

  const jwtPayload = {
    userId: user?._id,
    email: user?.email,
    role: user?.role,
  };

  const resetToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    "10m",
  );

  const resetLink = `${config.reset_ui_link}/reset-password?email=${user?.email}&token=${resetToken}`;

  sendEmail(user?.email, resetLink);
};

const resetPassword = async (
  payload: { email: string; newPassword: string },
  token: string,
) => {
  const user = await User.isUserExists(payload?.email);
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

  const decoded = verifyToken(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload;

  if (payload?.email !== decoded.email) {
    throw new AppError(status.FORBIDDEN, "Invalid email");
  }

  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt),
  );

  await User.findOneAndUpdate(
    {
      email: decoded?.email,
      role: decoded?.role,
    },
    {
      password: newHashedPassword,
      passwordChangedAt: new Date(),
    },
  );
};

const generateAccessTokenByRefreshToken = async (token: string) => {
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string,
  ) as JwtPayload;

  const { email, iat } = decoded;

  const user = await User.isUserExists(email);
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

  if (
    user?.passwordChangedAt &&
    User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)
  ) {
    throw new AppError(
      status.FORBIDDEN,
      "Your password has been changed, please login again!",
    );
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

  return accessToken;
};

export const AuthServices = {
  loginUser,
  changeUserPassIntoDB,
  forgetPassword,
  resetPassword,
  generateAccessTokenByRefreshToken,
  socialLoginUser,
};
