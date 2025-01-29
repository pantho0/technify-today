import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CommentService } from "./comment.service";

const postComment = catchAsync(async (req, res) => {
  const result = await CommentService.postCommentIntoDB(req.body);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Comment posted successfully",
    data: result,
  });
});

export const CommentControllers = {
  postComment,
};
