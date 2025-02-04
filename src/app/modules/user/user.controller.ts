import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";

const createUser = catchAsync(async (req, res) => {
  const userData = req.body;
  const result = await UserServices.createUserIntoDB(userData);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "User created successfully",
    data: result,
  });
});

const getAllUser = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUserFromDB();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Users retrived successfully",
    data: result,
  });
});

const getMe = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const result = await UserServices.getMeFromDB(userId);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "User retrived successfully",
    data: result,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const result = await UserServices.deleteUserFromDB(req.body);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "User deleted successfully",
    data: result,
  });
});

export const UserControllers = {
  createUser,
  getAllUser,
  getMe,
  deleteUser,
};
