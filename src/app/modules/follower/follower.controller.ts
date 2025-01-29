import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { FollowerServices } from "./follower.service";

const addFollow = catchAsync(async (req, res) => {
  const followData = req.body;
  const result = await FollowerServices.addFollowersIntoDB(followData);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Followers Added Successfully",
    data: result,
  });
});

const removeFollowers = catchAsync(async (req, res) => {
  const followData = req.body;
  const result = await FollowerServices.removeFollowersFromDB(followData);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Unfollowed Successfully",
    data: result,
  });
});

export const FollowersController = {
  addFollow,
  removeFollowers,
};
