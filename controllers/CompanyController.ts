import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const CompanyController = {
    createOrUpdate: async (req: Request, res: Response): Promise<Response | void> => {
        try {
            const { storeName, address, phone, email, taxCode } = req.body;

            // ✅ Check if a company already exists (based on `storeName`)
            const existingCompany = await prisma.company.findFirst({
                where: { storeName },
            });

            if (existingCompany) {
                // ✅ If company exists, update the existing record
                await prisma.company.update({
                    where: { id: existingCompany.id }, // Update by ID
                    data: { address, phone, email: email ?? "", taxCode },
                });

                return res.json({ message: "Company updated successfully", updated: true });
            } else {
                // ✅ If company does not exist, create a new one
                await prisma.company.create({
                    data: { storeName, address, phone, email: email ?? "", taxCode },
                });

                return res.json({ message: "Company created successfully", created: true });
            }
        } catch (err: unknown) {
            console.error("❌ Error in createOrUpdate:", err);
            if (err instanceof Error) {
                return res.status(500).json({ error: err.message });
            }
            return res.status(500).json({ error: "An unknown error occurred" });
        }
    },

    // ✅ New function to get company details
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