import { NextFunction, Request, Response } from "express";
import { TUserRole } from "../modules/user/user.interface";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/AppError";
import status from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { User } from "../modules/user/user.model";

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(status.UNAUTHORIZED, "You are not authorized");
    }

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { userId, email, role, iat } = decoded;

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
      user.passwordChangedAt &&
      User.isJWTIssuedBeforePasswordChanged(
        user.passwordChangedAt,
        iat as number,
      )
    ) {
      throw new AppError(
        status.FORBIDDEN,
        "You may be trying with old password",
      );
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(status.UNAUTHORIZED, "You are not authorized");
    }

    req.user = decoded as JwtPayload;

    console.log("req.user", req.user);

    next();
  });
};

export default auth;
