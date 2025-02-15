import express from "express";
import { ProductController } from "../controllers/ProductController";

const router = express.Router();

// ✅ Define Product Routes
router.post("/create", ProductController.createProduct);

export default router;
