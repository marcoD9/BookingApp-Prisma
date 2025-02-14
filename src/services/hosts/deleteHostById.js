import { PrismaClient } from "@prisma/client";

const deleteHostById = async (id) => {
  const prisma = new PrismaClient();

  //Delete the host's properties first
  await prisma.property.deleteMany({
    where: {
      hostId: id,
    },
  });
  //Delete the host
  const host = await prisma.host.deleteMany({
    where: { id },
  });
  return host.count > 0 ? id : null;
};

export default deleteHostById;
