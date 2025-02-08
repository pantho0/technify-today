import { Router } from "express";
import { AuthControllers } from "./auth.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.const";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidationSchemas } from "./auth.validation";

const router = Router();

router.post(
  "/login",
  validateRequest(AuthValidationSchemas.userLoginValidatin),
  AuthControllers.loginUser,
);
router.post("/refresh-token", AuthControllers.getAccessTokenByRefreshToken);
router.post("/forget-password", AuthControllers.forgetPassword);
router.post("/reset-password", AuthControllers.resetPassword);
router.put(
  "/change-password",
  auth(USER_ROLE.admin, USER_ROLE.user),
  AuthControllers.changePassword,
);

export const AuthRoutes = router;
