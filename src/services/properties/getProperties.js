import { PrismaClient } from "@prisma/client";

const getProperties = async () => {
  const prisma = new PrismaClient();
  try {
    const properties = await prisma.property.findMany();
    return properties;
  } catch (error) {
    console.error("Error fetching properties:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

export default getProperties;
