import { Router } from "express";
import { PostControllers } from "./post.controller";
import validateRequest from "../../middlewares/validateRequest";
import { PostValidation } from "./post.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.const";

const router = Router();

router.get(
  "/",
  auth(USER_ROLE.user, USER_ROLE.admin),
  PostControllers.getPosts,
);
router.patch(
  "/update-post/:id",
  validateRequest(PostValidation.updatePostValidationSchema),
  PostControllers.updatePost,
);
router.put("/delete-post/:id", PostControllers.deletePost);
router.put("/upvote", PostControllers.upVote);
router.put("/downvote", PostControllers.downVote);
router.post(
  "/create-post",
  validateRequest(PostValidation.createPostValidationSchema),
  PostControllers.createPost,
);

export const PostRoutes = router;
