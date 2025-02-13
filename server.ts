import express, { Request, Response, RequestHandler } from "express";
import cors from "cors";
import { UserController } from "./controllers/UserControllers";
import { CompanyController } from "./controllers/CompanyController";
import { PrismaClient } from "@prisma/client";

const app = express();
const port: number = 3001;
const prisma = new PrismaClient();
const apiVersion = "1.0.0"; // ✅ Define API version

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Check Database Connection
app.get("/api/check-db-connection", async (req: Request, res: Response) => {
    try {
        await prisma.$connect();
        res.json({ message: "✅ Connected to the database successfully" });
        console.log("✅ Database Connection Successful");
    } catch (error: any) {
        console.error("❌ Database Connection Failed:", error);
        res.status(500).json({ error: "Cannot connect to database", details: error.message });
    }
});

// ✅ New System Status Route
app.get("/api/system-status", async (req: Request, res: Response) => {
    try {
        const startTime = Date.now();
        await prisma.$connect();
        const dbLatency = Date.now() - startTime; // ✅ Measure DB response time

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

// ✅ Root Route
app.get("/", (req: Request, res: Response) => {
    res.send("Hello From Server");
});

// ✅ User Authentication Routes
app.post("/api/user/signIn", UserController.signIn as RequestHandler);


// ✅ Alias for `/api/user/signIn` → `/api/signin`
app.post("/api/signin", UserController.signIn as RequestHandler);



//Company
app.post("/company", CompanyController.create as RequestHandler);



//*--------------------------------------------------------------------------------------------------
// ✅ Graceful Shutdown - Close Prisma on Exit
process.on("SIGINT", async () => {
    console.log("🛑 Shutting down server...");
    await prisma.$disconnect();
    process.exit(0);
});

app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
    console.log(`🔧 Running in ${process.env.NODE_ENV || "development"} mode`);
});

/**
 * Run Server (Install as a dev dependency)
 * "scripts": { "dev": "ts-node-dev --respawn server.ts" }
 * Command: npm run dev
 * 
 * Run with nodemon + ts-node (Auto Restart on Changes)
 * Command: nodemon --exec ts-node server.ts
 */
