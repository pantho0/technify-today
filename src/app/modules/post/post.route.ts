import { Router } from "express";
import { PostControllers } from "./post.controller";

const router = Router();

router.get("/", PostControllers.getPosts);
router.patch("/update-post/:id", PostControllers.createPost);
router.post("/create-post", PostControllers.createPost);

export const PostRoutes = router;
