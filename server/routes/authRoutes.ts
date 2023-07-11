import express from "express";
import { loginUser, registerUser } from "../controllers/authController";
import { authMiddleware } from "../middleware/authMiddleware";

const authRouter: express.Router = express.Router();

authRouter.post("/login", loginUser);
authRouter.post("/register", registerUser);

export default authRouter;