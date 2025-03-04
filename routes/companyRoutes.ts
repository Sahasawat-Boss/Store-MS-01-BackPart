import express, { RequestHandler } from "express"; // ✅ Import RequestHandler
import { CompanyController } from "../controllers/CompanyController";

const router = express.Router();

// ✅ Use `createOrUpdate` instead of `create`
router.post("/updateCompany", CompanyController.updateCompany as RequestHandler);

// ✅ Get company data
router.get("/get", CompanyController.getCompanyData as RequestHandler);

export default router;
