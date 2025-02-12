import express, { Request, Response, RequestHandler } from "express";
import cors from "cors";
import { UserController } from "./controllers/UserControllers";
import { PrismaClient } from "@prisma/client";

const app = express();
const port: number = 3001;
const prisma = new PrismaClient();

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

// ✅ Root Route
app.get("/", (req: Request, res: Response) => {
    res.send("Hello From Server");
});

// ✅ User Authentication Routes
app.post("/api/user/signIn", UserController.signIn as RequestHandler);

// ✅ Alias for `/api/user/signIn` → `/api/signin`
app.post("/api/signin", UserController.signIn as RequestHandler);

// ✅ Graceful Shutdown - Close Prisma on Exit
process.on("SIGINT", async () => {
    console.log("🛑 Shutting down server...");
    await prisma.$disconnect();
    process.exit(0);
});

app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
    console.log(`🔧 Running in development mode`);
});

/**
 * Run Server (Install as a dev dependency)
 * "scripts": { "dev": "ts-node-dev --respawn server.ts" }
 * Command: npm run dev
 * 
 * Run with nodemon + ts-node (Auto Restart on Changes)
 * Command: nodemon --exec ts-node server.ts
 */
