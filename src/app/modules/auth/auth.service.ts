import { User } from "../user/user.model";
import { IUserLogin } from "./auth.interface";

const loginUser = async (payload: IUserLogin) => {
  const user = await User.findOne({ email: payload.email }).select("+password");

  if (!(await User.isPasswordMatched(payload?.password, user!.password))) {
    throw new Error("Invalid credentials");
  }
};
