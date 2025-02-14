import { PrismaClient } from "@prisma/client";

const createProperty = async (
  title,
  description,
  location,
  pricePerNight,
  bedroomCount,
  bathRoomCount,
  maxGuestCount,
  hostId
) => {
  const prisma = new PrismaClient();

  try {
    const existingHost = await prisma.host.findUnique({
      where: { id: hostId },
    });

    if (!existingHost) {
      throw new Error(`Host with ID ${hostId} not found.`);
    }

    const property = await prisma.property.create({
      data: {
        title,
        description,
        location,
        pricePerNight,
        bedroomCount,
        bathRoomCount,
        maxGuestCount,
        host: { connect: { id: hostId } }, // Connect to the host
      },
    });

    return property;
  } catch (error) {
    console.error("Error creating property:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

export default createProperty;
