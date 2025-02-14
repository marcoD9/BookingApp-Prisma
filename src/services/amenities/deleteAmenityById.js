import { PrismaClient } from "@prisma/client";

const deleteAmenityById = async (id) => {
  const prisma = new PrismaClient();

  const amenity = await prisma.amenity.deleteMany({
    where: { id },
  });
  return amenity ? id : null;
};

export default deleteAmenityById;
