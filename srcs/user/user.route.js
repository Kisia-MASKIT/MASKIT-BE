// srcs/user/user.route.js
import express from "express";
import { UserController } from "./user.controller.js";

const router = express.Router();

router.post("/signUp", UserController.signUp);
router.post("/login", UserController.login); // 로그인 라우트 추가

export default router;
