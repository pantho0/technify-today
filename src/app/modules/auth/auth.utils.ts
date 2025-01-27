import jwt from "jsonwebtoken";
import { Types } from "mongoose";

export const createToken = (
  jwtPayload: {
    userId: Types.ObjectId | undefined;
    role: "admin" | "user" | undefined;
    email: string | undefined;
  },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};
