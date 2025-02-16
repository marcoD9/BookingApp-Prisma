import { PrismaClient } from "@prisma/client";

const deleteHostById = async (id) => {
  const prisma = new PrismaClient();

  //If host doesn't exist return null
  const hostExists = await prisma.host.findUnique({
    where: { id },
  });
  if (!hostExists) {
    return null;
  }

  // 1. Find host's properties
  const properties = await prisma.property.findMany({
    where: { hostId: id },
  });

  // 2. Delete reviews and bookings of the properties
  for (const property of properties) {
    await prisma.review.deleteMany({
      where: { propertyId: property.id },
    });

    await prisma.booking.deleteMany({
      where: { propertyId: property.id },
    });
  }

  // 3. Delete properties
  await prisma.property.deleteMany({
    where: { hostId: id },
  });

  // 4. Now we can delete the host
  const host = await prisma.host.delete({
    where: { id },
  });
  return host ? id : null;
};

export default deleteHostById;
