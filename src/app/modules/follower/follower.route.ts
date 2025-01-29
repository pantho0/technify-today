import { Router } from "express";
import { FollowersController } from "./follower.controller";

const router = Router();

router.put("/", FollowersController.addFollow);
router.delete("/", FollowersController.removeFollowers);

export const FollowerRoutes = router;
