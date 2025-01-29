import { IPost } from "./post.interface";
import { Post } from "./post.model";

const createPostIntoDB = async (payload: IPost) => {
  const result = await Post.create(payload);
  return result;
};

const getPostsFromDB = async () => {
  const result = await Post.find();
  return result;
};

export const PostServices = {
  createPostIntoDB,
  getPostsFromDB,
};
