import { NextFunction, Request, Response, Router } from "express";
import { UserControllers } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "./user.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "./user.const";
import { upload } from "../../utils/sendImageToCloudinary";

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
router.put(
  "/update-profile-picture",
  auth(USER_ROLE.admin, USER_ROLE.user),
  upload.single("file"),
  UserControllers.uploadImage,
);

export const UserRoutes = router;
