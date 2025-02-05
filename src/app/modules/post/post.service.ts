import { Types } from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import { IPost } from "./post.interface";
import { Post } from "./post.model";

const createPostIntoDB = async (payload: IPost) => {
  const result = await Post.create(payload);
  return result;
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

  const result = await postQuery.modelQuery;
  return result;
};

const postUpdateIntoDB = async (
  credentials: {
    userId: Types.ObjectId;
    role: string;
    email: string;
    iat: number;
    exp: number;
  },
  id: string,
  payload: Partial<IPost>,
) => {
  const post = await Post.findById(id);

  if (post?.user._id !== credentials.userId) {
    throw new Error("You are not the owner of this post");
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
};
