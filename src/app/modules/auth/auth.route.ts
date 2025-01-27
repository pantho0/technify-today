import { Router } from "express";
import { AuthControllers } from "./auth.controller";

const router = Router();

router.post("/", AuthControllers.loginUser);

export const AuthRoutes = router;
