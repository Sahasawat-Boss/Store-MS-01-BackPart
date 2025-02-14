import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();
const apiVersion = "1.0.0";

// ✅ Check Database Connection
router.get("/check-db-connection", async (req: Request, res: Response) => {
    try {
        await prisma.$connect();
        res.json({ message: "✅ Connected to the database successfully" });
        console.log("✅ Database Connection Successful");
    } catch (error: any) {
        console.error("❌ Database Connection Failed:", error);
        res.status(500).json({ error: "Cannot connect to database", details: error.message });
    }
});

// ✅ System Status Route
router.get("/system-status", async (req: Request, res: Response) => {
    try {
        const startTime = Date.now();
        await prisma.$connect();
        const dbLatency = Date.now() - startTime;

        res.json({
            server: "Connected",
            database: "Connected",
            apiVersion,
            environment: process.env.NODE_ENV || "Development",
        });
    } catch (error) {
        res.status(500).json({
            server: "Disconnected",
            database: "Disconnected",
            apiVersion,
            environment: process.env.NODE_ENV || "Development",
        });
    }
});

export default router;
