import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { PostRoutes } from "../modules/post/post.route";
import { CommentRoutes } from "../modules/comment/comment.route";
import { FollowerRoutes } from "../modules/follower/follower.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/posts",
    route: PostRoutes,
  },
  {
    path: "/comment",
    route: CommentRoutes,
  },
  {
    path: "/followers",
    route: FollowerRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
