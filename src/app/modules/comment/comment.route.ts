import { Router } from "express";
import { CommentControllers } from "./comment.controller";
import validateRequest from "../../middlewares/validateRequest";
import { CommentValidation } from "./comment.validation";

const router = Router();

router.post(
  "/",
  validateRequest(CommentValidation.CommenValidationtSchema),
  CommentControllers.postComment,
);

export const CommentRoutes = router;
