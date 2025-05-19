/* eslint-disable @typescript-eslint/no-namespace */
import { JwtPayload } from "jsonwebtoken";
import { IUser } from "../modules/user/user.interface";

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }
}

export interface IResponse {
  statusCode?: number;
  success?: boolean;
  message?: string;
  data?: IUser;
}

export interface ISocialLoginUser {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  profileImage: string;
  password: string;
}
