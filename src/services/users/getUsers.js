import { PrismaClient } from "@prisma/client";

const getUsers = async () => {
  const prisma = new PrismaClient();
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
        phoneNumber: true,
        profilePicture: true,
      },
    });

    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

export default getUsers;
