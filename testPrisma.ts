import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    try {
        console.log("🔍 Fetching all users from MongoDB using Prisma...");
        const users = await prisma.user.findMany(); // Fetch all users

        console.log("✅ Users in database:", users);
    } catch (error) {
        console.error("❌ Error fetching users with Prisma:", error);
    } finally {
        await prisma.$disconnect();
    }
}

main();

// 🔍 Fetching all users from MongoDB using Prisma...
// ✅ Users in database: [
//   {
//     id: '67aa20f6be8324559ac8f414',
//     username: 'boss',
//     password: '123',
//     name: 'boss',
//     level: 'admin',
//     status: 'active'
//   }
// ]
