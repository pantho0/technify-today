import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { PostServices } from "./post.service";
import { ICredentials } from "./post.interface";

const createPost = catchAsync(async (req, res) => {
  const postData = req.body;
  const result = await PostServices.createPostIntoDB(
    req.file as Express.Multer.File,
    postData,
  );
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Post created successfully",
    data: result,
  });
});

const getPosts = catchAsync(async (req, res) => {
  const result = await PostServices.getPostsFromDB(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Posts retrived successfully",
    data: result,
  });
});

const getSinglePost = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PostServices.getSinglePostFromDB(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Post retrived successfully",
    data: result,
  });
});

const updatePost = catchAsync(async (req, res) => {
  const credentials = req.user as ICredentials;
  const { id } = req.params;
  const updatedPostData = req.body;
  const result = await PostServices.postUpdateIntoDB(
    req.file as Express.Multer.File,
    credentials,
    id,
    updatedPostData,
  );
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Post updated successfully",
    data: result,
  });
});

const getOwnPosts = catchAsync(async (req, res) => {
  const credentials = req.user as ICredentials;

  const result = await PostServices.getOwnPostsFromDB(credentials);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Posts retrived successfully",
    data: result,
  });
});

const upVote = catchAsync(async (req, res) => {
  const { postId, userId } = req.body;
  console.log(postId, userId);
  const result = await PostServices.addUpVoteIntoPost(postId, userId);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Upvoted successfully",
    data: result,
  });
});

const downVote = catchAsync(async (req, res) => {
  const { postId, userId } = req.body;
  const result = await PostServices.addDownVoteIntoPost(postId, userId);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Upvoted successfully",
    data: result,
  });
});

const deletePost = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PostServices.deletePostFromDB(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Post deleted successfully",
    data: result,
  });
});

export const PostControllers = {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  upVote,
  downVote,
  getSinglePost,
  getOwnPosts,
};
