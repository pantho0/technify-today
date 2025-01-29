import jwt, { JwtPayload } from "jsonwebtoken";

export const verifyToken = async (token: string, secret: string) => {
  const decoded = jwt.verify(token, secret) as JwtPayload;
  return decoded;
};
