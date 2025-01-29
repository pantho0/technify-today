import { Router } from "express";
import { PostControllers } from "./post.controller";

const router = Router();

router.get("/", PostControllers.getPosts);
router.post("/create-post", PostControllers.createPost);

export const PostRoutes = router;
