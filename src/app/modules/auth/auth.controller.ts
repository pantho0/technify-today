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
      refreshToken,
    },
  });
});

const socialLoginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.socialLoginUser(req.body);
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
      refreshToken,
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

const forgetPassword = catchAsync(async (req, res) => {
  const result = await AuthServices.forgetPassword(req.body);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Reset link generated successfully. Check your inbox.",
    data: result,
  });
});

const resetPassword = catchAsync(async (req, res) => {
  const token = req?.headers?.authorization;
  const result = await AuthServices.resetPassword(req.body, token as string);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Password Reset Successfully",
    data: result,
  });
});

const getAccessTokenByRefreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result =
    await AuthServices.generateAccessTokenByRefreshToken(refreshToken);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Access Token Generated Successfully",
    data: result,
  });
});

export const AuthControllers = {
  loginUser,
  changePassword,
  forgetPassword,
  resetPassword,
  getAccessTokenByRefreshToken,
  socialLoginUser,
};
