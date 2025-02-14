import { PrismaClient } from "@prisma/client";

const getHosts = async () => {
  const prisma = new PrismaClient();
  try {
    const hosts = await prisma.host.findMany({
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
        phoneNumber: true,
        profilePicture: true,
        aboutMe: true,
      },
    });
    return hosts;
  } catch (error) {
    console.error("Error fetching hosts:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

export default getHosts;
