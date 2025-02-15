import { PrismaClient } from "@prisma/client";
import { Request, Response, RequestHandler } from "express";

const prisma = new PrismaClient();

export const ProductController = {
    createProduct: (async (req: Request, res: Response) => {
        try {
            const { serialNo, productName, productDetails, productPrice, remark, status } = req.body;

            // ✅ Ensure required fields are provided
            if (!serialNo || !productName || productPrice === undefined || isNaN(Number(productPrice))) {
                res.status(400).json({ message: "Missing or invalid required fields: serialNo, productName, productPrice." });
                return; // ✅ Fix: Return after sending response
            }

            // ✅ Create product in database
            const product = await prisma.product.create({
                data: {
                    serialNo,
                    productName,
                    productDetails: productDetails || null,
                    productPrice: parseFloat(productPrice), // Ensure correct data type
                    remark: remark || null,
                    status: status || "available",
                },
            });

            res.status(201).json({ message: "Product created successfully!", product }); // ✅ Fix: No `return` statement
        } catch (error) {
            console.error("❌ Error in createProduct:", error);

            if (error instanceof Error) {
                res.status(500).json({ message: error.message }); // ✅ Fix: No `return` statement
            } else {
                res.status(500).json({ message: "Internal Server Error" });
            }
        }
    }) as RequestHandler, // ✅ Fix: Now this matches the expected type
};
