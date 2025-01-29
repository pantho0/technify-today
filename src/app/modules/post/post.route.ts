import { Router } from "express";
import { PostControllers } from "./post.controller";

const router = Router();

router.post("/create-post", PostControllers.createPost);

export const PostRoutes = router;
