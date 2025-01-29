import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { PostServices } from "./post.service";

const createPost = catchAsync(async (req, res) => {
  const postData = req.body;
  const result = await PostServices.createPostIntoDB(postData);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Post created successfully",
    data: result,
  });
});

export const PostControllers = {
  createPost,
};
