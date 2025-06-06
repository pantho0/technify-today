import QueryBuilder from "../../builder/QueryBuilder";
import { ICredentials, IPost } from "./post.interface";
import { Post } from "./post.model";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import AppError from "../../errors/AppError";
import status from "http-status";

const createPostIntoDB = async (file: Express.Multer.File, payload: IPost) => {
  if (file) {
    const imageName = `${payload.title.slice(0, 4)}-${Date.now()}`;
    const path = file?.path;
    const imageUrl = await sendImageToCloudinary(imageName, path);
    payload.image = imageUrl?.secure_url as string;
  }

  if (!payload.image) {
    throw new AppError(
      status.BAD_REQUEST,
      "Image upload failed! Try with different image",
    );
  }

  const result = await Post.create(payload);

  return result;
};

const getSinglePostFromDB = async (id: string) => {
  const result = await Post.findById(id).populate("user").populate({
    path: "comments",
    populate: "user",
  });
  return result;
};

const getOwnPostsFromDB = async (
  credentials: ICredentials,
  query: Record<string, unknown>,
) => {
  const searchableFields = ["title"];
  const postQuery = new QueryBuilder(
    Post.find({ user: credentials.userId }).populate(["user", "comments"]),
    query,
  )
    .search(searchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await postQuery.countTotal();
  const result = await postQuery.modelQuery;
  return { meta, result };
};
const getPostsFromDB = async (query: Record<string, unknown>) => {
  const searchableFields = ["title"];
  const postQuery = new QueryBuilder(
    Post.find().populate(["user", "comments"]),
    query,
  )
    .search(searchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await postQuery.countTotal();
  const result = await postQuery.modelQuery;
  return { meta, result };
};

const postUpdateIntoDB = async (
  file: Express.Multer.File,
  credentials: ICredentials,
  id: string,
  payload: Partial<IPost>,
) => {
  const post = await Post.findById(id);

  if (post?.user._id?.toString() !== credentials.userId) {
    throw new Error("You are not the owner of this post");
  }

  if (file) {
    const imageName = `${payload?.title ? payload.title : post?.title}-${Date.now()}`;
    const path = file?.path;
    const imageUrl = await sendImageToCloudinary(imageName, path);
    payload.image = imageUrl?.secure_url as string;
  }

  const result = await Post.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const addUpVoteIntoPost = async (postId: string, userId: string) => {
  const result = await Post.findByIdAndUpdate(
    postId,
    {
      $addToSet: { upVote: userId },
      $pull: { downVote: userId },
    },
    { new: true },
  );
  return result;
};

const addDownVoteIntoPost = async (postId: string, userId: string) => {
  const result = await Post.findByIdAndUpdate(
    postId,
    {
      $addToSet: { downVote: userId },
      $pull: { upVote: userId },
    },
    { new: true },
  );
  return result;
};

const deletePostFromDB = async (id: string) => {
  const result = await Post.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const PostServices = {
  createPostIntoDB,
  getPostsFromDB,
  postUpdateIntoDB,
  deletePostFromDB,
  addUpVoteIntoPost,
  addDownVoteIntoPost,
  getSinglePostFromDB,
  getOwnPostsFromDB,
};
