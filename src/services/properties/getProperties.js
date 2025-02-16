import { PrismaClient } from "@prisma/client";

const getProperties = async (location, pricePerNight, amenities) => {
  const prisma = new PrismaClient();

  const properties = await prisma.property.findMany({
    where: {
      location: location ? location : undefined, // Filters location
      pricePerNight: pricePerNight ? pricePerNight : undefined, // Filtrs price
      amenities: amenities
        ? {
            some: {
              name: { in: amenities }, // Filters amenities
            },
          }
        : undefined,
    },
    include: {
      amenities: true, // Includes related amenities
      reviews: true, // Includes related reviews
    },
  });
  return properties;
};

export default getProperties;
