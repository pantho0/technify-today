import status from "http-status";
import config from "../../config";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";

const loginUser = catchAsync(async (req, res) => {
  const loginData = req.body;
  const result = await AuthServices.loginUser(loginData);
  const { accessToken, refreshToken } = result;
  res.cookie("refreshToken", refreshToken, {
    secure: config.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 90 * 24 * 60 * 60 * 1000,
  });

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Login Success",
    data: {
      accessToken,
    },
  });
});

const changePassword = catchAsync(async (req, res) => {
  const result = await AuthServices.changeUserPassIntoDB(req.user, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Password Changed Successfully",
    data: result,
  });
});

export const AuthControllers = {
  loginUser,
  changePassword,
};
