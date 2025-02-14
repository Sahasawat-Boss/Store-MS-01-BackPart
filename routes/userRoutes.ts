import express, { RequestHandler } from "express";
import { UserController } from "../controllers/UserControllers";

const router = express.Router();

// ✅ Correctly cast UserController.signIn as a RequestHandler
router.post("/signIn", UserController.signIn as RequestHandler);

export default router;
