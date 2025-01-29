import { Post } from "../post/post.model";
import { IComment } from "./comment.interface";
import { Comment } from "./comment.model";

const postCommentIntoDB = async (payload: IComment) => {
  const newComment = await Comment.create(payload);
  if (newComment) {
    await Post.findByIdAndUpdate(
      payload.postId,
      { $push: { comments: newComment._id } },
      { new: true },
    );
  }
  return newComment;
};

export const CommentService = {
  postCommentIntoDB,
};
