import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const ProductController = {
    // ✅ Create a new product
    async createProduct(req: Request, res: Response): Promise<void> {
        try {
            const { serialNo, productName, productDetails, productPrice, remark, status } = req.body;

            const product = await prisma.product.create({
                data: {
                    serialNo,
                    productName,
                    productDetails,
                    productPrice,
                    remark,
                    status: status || "available",
                },
            });

            res.status(201).json({ message: "Product created successfully!", product });
        } catch (error) {
            console.error("❌ Error creating product:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },
};
