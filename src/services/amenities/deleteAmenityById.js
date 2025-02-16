import { PrismaClient } from "@prisma/client";

const deleteAmenityById = async (id) => {
  const prisma = new PrismaClient();

  // Verify if amenity exists
  const amenity = await prisma.amenity.findUnique({
    where: { id },
  });

  if (!amenity) {
    // If it doesn't exist return null
    return null;
  }

  await prisma.amenity.delete({
    where: { id },
  });
  return amenity ? id : null;
};

export default deleteAmenityById;
