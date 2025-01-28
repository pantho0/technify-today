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

export const UserControllers = {
  createUser,
  getAllUser,
};
