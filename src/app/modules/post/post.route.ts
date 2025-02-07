import { NextFunction, Request, Response, Router } from "express";
import { PostControllers } from "./post.controller";
import validateRequest from "../../middlewares/validateRequest";
import { PostValidation } from "./post.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.const";
import { upload } from "../../utils/sendImageToCloudinary";

const router = Router();

router.get("/", PostControllers.getPosts);
router.patch(
  "/update-post/:id",
  auth(USER_ROLE.admin, USER_ROLE.user),
  // validateRequest(PostValidation.updatePostValidationSchema),
  PostControllers.updatePost,
);
router.put(
  "/delete-post/:id",
  auth(USER_ROLE.admin, USER_ROLE.user),
  PostControllers.deletePost,
);
router.put("/upvote", PostControllers.upVote);
router.put("/downvote", PostControllers.downVote);
router.post(
  "/create-post",
  auth(USER_ROLE.admin, USER_ROLE.user),
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(PostValidation.createPostValidationSchema),
  PostControllers.createPost,
);

export const PostRoutes = router;
