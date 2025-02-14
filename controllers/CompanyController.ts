import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const CompanyController = {
    create: async (req: Request, res: Response): Promise<Response | void> => {
        try {
            await prisma.company.create({
                data: {
                    storeName: req.body.storeName,
                    address: req.body.address,
                    phone: req.body.phone,
                    email: req.body.email ?? "",
                    taxCode: req.body.taxCode,
                },
            });

            return res.json({ message: "Updated Successfully" });
        } catch (err: unknown) {
            if (err instanceof Error) {
                return res.status(500).json({ error: err.message });
            }
            return res.status(500).json({ error: "An unknown error occurred" });
        }
    },
};
