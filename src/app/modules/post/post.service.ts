import { IPost } from "./post.interface";
import { Post } from "./post.model";

const createPostIntoDB = async (payload: IPost) => {
  const result = await Post.create(payload);
  return result;
};

const getPostsFromDB = async (query: Record<string, unknown>) => {
  const queryObj = { ...query };

  let searchTerm = "";
  if (query.searchTerm) {
    searchTerm = query.searchTerm as string;
  }

  const searchableFields = ["title"];

  const searchQuery = Post.find({
    $or: searchableFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: "i" },
    })),
  });

  const excludeFields = ["searchTerm", "sort", "limit", "page", "fields"];
  excludeFields.forEach((el) => delete queryObj[el]);

  const filterQuery = searchQuery.find(queryObj).populate(["user", "comments"]);

  let sort = "-createdAt";
  if (query.sort) {
    sort = query.sort as string;
  }

  const sortedQuery = filterQuery.sort(sort);

  let limit = 1;
  let page = 1;
  let skip = 0;

  if (query.limit) {
    limit = Number(query.limit);
  }

  if (query.page) {
    page = Number(query.page);
    skip = (page - 1) * limit;
  }

  const paginateQuery = sortedQuery.skip(skip);
  const limitQuery = paginateQuery.limit(limit);

  let fields = "-__v";
  if (query.fields) {
    fields = (query.fields as string).split(",").join(" ");
  }

  const fieldQuery = await limitQuery.select(fields);

  return fieldQuery;
};

const postUpdateIntoDB = async (id: string, payload: Partial<IPost>) => {
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
