import { PrismaClient } from "@prisma/client";

const getProperties = async () => {
  const prisma = new PrismaClient();

  const properties = await prisma.property.findMany({
    include: {
      amenities: true, // Include related amenities
      reviews: true, // Include related reviews
    },
  });
  return properties;
};

export default getProperties;
