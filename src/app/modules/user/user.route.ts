import { Router } from "express";
import { UserControllers } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "./user.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "./user.const";

const router = Router();

router.get("/", auth(USER_ROLE.admin), UserControllers.getAllUser);
router.post(
  "/create-user",
  validateRequest(UserValidation.userValidationSchema),
  UserControllers.createUser,
);
router.get("/me", auth(USER_ROLE.admin, USER_ROLE.user), UserControllers.getMe);
router.put("/delete-user", auth(USER_ROLE.admin), UserControllers.deleteUser);
router.put("/block-user", auth(USER_ROLE.admin), UserControllers.blockUser);

export const UserRoutes = router;
