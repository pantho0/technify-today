import { Router } from "express";
import { PostControllers } from "./post.controller";

const router = Router();

router.get("/", PostControllers.getPosts);
router.patch("/update-post/:id", PostControllers.updatePost);
router.put("/delete-post/:id", PostControllers.deletePost);
router.put("/upvote", PostControllers.upVote);
router.put("/downvote", PostControllers.downVote);
router.post("/create-post", PostControllers.createPost);

export const PostRoutes = router;
