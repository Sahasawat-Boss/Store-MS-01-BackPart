import express from "express";
import { ProductController } from "../controllers/ProductController";

const router = express.Router();

// ✅ Define Product Routes
router.post("/createProduct", ProductController.createProduct);

router.get("/getAllProducts", ProductController.getAllProducts);


//http://localhost:3001/api/product/createProduct

export default router;
