import { Router } from "express";
import { CommentControllers } from "./comment.controller";

const router = Router();

router.post(
  "/",
  // validateRequest(CommentValidation.CommenValidationtSchema),
  CommentControllers.postComment,
);

export const CommentRoutes = router;
