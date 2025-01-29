import { IPost } from "./post.interface";
import { Post } from "./post.model";

const createPostIntoDB = async (payload: IPost) => {
  const result = await Post.create(payload);
  return result;
};

const getPostsFromDB = async () => {
  const result = await Post.find().populate(["user", "comments"]);
  return result;
};

const postUpdateIntoDB = async (id: string, payload: Partial<IPost>) => {
  const result = await Post.findByIdAndUpdate(id, payload, { new: true });
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
};
