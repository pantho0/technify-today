import { Router } from "express";
import { UserControllers } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { userValidation } from "./user.validation";

const router = Router();

router.get("/", UserControllers.getAllUser);
router.post(
  "/create-user",
  validateRequest(userValidation.userValidationSchema),
  UserControllers.createUser,
);

export const UserRoutes = router;
