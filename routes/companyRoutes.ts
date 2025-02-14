import express, { RequestHandler } from "express"; // ✅ Import RequestHandler
import { CompanyController } from "../controllers/CompanyController";

const router = express.Router();

// ✅ Company Routes
router.post("/createStoreInfo", CompanyController.create as RequestHandler);

export default router;
