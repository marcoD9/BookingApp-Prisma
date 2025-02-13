import { PrismaClient } from "@prisma/client";

const deletePropertyById = async (id) => {
  const prisma = new PrismaClient();
  //Delete the review of the property first
  await prisma.review.deleteMany({
    where: {
      propertyId: id,
    },
  });

  //Now we can delete the property
  const property = await prisma.property.deleteMany({
    where: { id },
  });

  return property.count > 0 ? id : null;
};

export default deletePropertyById;
