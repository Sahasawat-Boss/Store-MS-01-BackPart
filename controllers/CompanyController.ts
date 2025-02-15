import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const CompanyController = {
    updateCompany: async (req: Request, res: Response): Promise<Response | void> => {
        try {
            const { storeName, address, phone, email, taxCode } = req.body;

            // ✅ Check if the company exists
            const existingCompany = await prisma.company.findFirst({
                where: { storeName },
            });

            if (!existingCompany) {
                return res.status(404).json({ message: "Company not found" });
            }

            // ✅ Update the existing company
            await prisma.company.update({
                where: { id: existingCompany.id },
                data: { address, phone, email: email ?? "", taxCode },
            });

            return res.json({ message: "Company updated successfully", updated: true });

        } catch (err: unknown) {
            console.error("❌ Error in updateCompany:", err);
            if (err instanceof Error) {
                return res.status(500).json({ error: err.message });
            }
            return res.status(500).json({ error: "An unknown error occurred" });
        }
    },

    // ✅ Function to get company details
    getCompanyData: async (req: Request, res: Response): Promise<Response | void> => {
        try {
            const company = await prisma.company.findFirst(); // ✅ Fetch first company record

            if (!company) {
                return res.status(404).json({ message: "No company data found" });
            }

            return res.json(company); // ✅ Return company details
        } catch (err: unknown) {
            console.error("❌ Error fetching company data:", err);
            if (err instanceof Error) {
                return res.status(500).json({ error: err.message });
            }
            return res.status(500).json({ error: "An unknown error occurred" });
        }
    },
};
