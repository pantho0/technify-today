import { Router } from "express";
import { FollowersController } from "./follower.controller";

const router = Router();

router.put("/", FollowersController.addFollow);

export const FollowerRoutes = router;
