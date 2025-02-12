import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response } from "express";

dotenv.config();

const prisma = new PrismaClient();

export const UserController = {
    signIn: async (req: Request, res: Response): Promise<Response | void> => {
        try {
            console.log("✅ Received Login Request:", req.body);

            const user = await prisma.user.findFirst({
                where: {
                    username: req.body.username,
                    password: req.body.password, // WARNING: Plain text passwords are insecure!
                    status: "active",
                },
            });

            if (!user) {
                return res.status(401).json({ message: "Invalid username or password" });
            }

            const token = jwt.sign(
                { id: user.id },
                process.env.SECRET_KEY as string,
                { expiresIn: "30d" }
            );

            return res.json({ token });

        } catch (error: any) {
            console.error("❌ SignIn Error:", error);
            return res.status(500).json({ message: error.message || "Internal Server Error" });
        }
    },
};
