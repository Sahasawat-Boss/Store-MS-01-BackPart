import { PrismaClient } from "@prisma/client";
import { Request, Response, RequestHandler } from "express";

const prisma = new PrismaClient();

export const ProductController = {
    createProduct: (async (req: Request, res: Response) => {
        try {
            const { serialNo, productName, productDetails, productPrice, remark, status } = req.body;

            if (!serialNo || !productName || productPrice === undefined || isNaN(Number(productPrice))) {
                res.status(400).json({ message: "Missing or invalid required fields: serialNo, productName, productPrice." });
                return;
            }

            const product = await prisma.product.create({
                data: {
                    serialNo,
                    productName,
                    productDetails: productDetails || null,
                    productPrice: parseFloat(productPrice),
                    remark: remark || null,
                    status: status || "available",
                },
            });

            res.status(201).json({ message: "Product created successfully!", product });
        } catch (error) {
            console.error("❌ Error in createProduct:", error);
            res.status(500).json({ message: error instanceof Error ? error.message : "Internal Server Error" });
        }
    }) as RequestHandler,

    // ✅ New API: Get All Products
    getAllProducts: (async (req: Request, res: Response) => {
        try {
            const products = await prisma.product.findMany();
            res.status(200).json(products);
        } catch (error) {
            console.error("❌ Error in getAllProducts:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }) as RequestHandler,
};
