import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import userRoutes from "./routes/userRoutes";
import companyRoutes from "./routes/companyRoutes";
import systemRoutes from "./routes/systemRoutes";

const app = express();
const port: number = 3001;
const prisma = new PrismaClient();

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
// ✅ User Route Mapping
app.use("/api/user", userRoutes);

// ✅ Company Route Mapping
app.use("/api/company", companyRoutes);

// ✅ System Route Mapping
app.use("/api/system", systemRoutes);




//*-----------------------------------------------------------------------------------
// ✅ Root Route
app.get("/", (req, res) => {
    res.send("Hello From Boss Server");
});

// ✅ Graceful Shutdown - Close Prisma on Exit
process.on("SIGINT", async () => {
    console.log("🛑 Shutting down server...");
    await prisma.$disconnect();
    process.exit(0);
});

// ✅ Start Server
app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
    console.log(`🔧 Running in ${process.env.NODE_ENV || "development"} mode`);
});