import { PrismaClient } from "@prisma/client";

const deleteUserById = async (id) => {
  const prisma = new PrismaClient();
  //Delete the bookings
  await prisma.booking.deleteMany({
    where: {
      userId: id,
    },
  });
  //Delete the reviews
  await prisma.review.deleteMany({
    where: {
      userId: id,
    },
  });
  //Now delete user
  const user = await prisma.user.deleteMany({
    where: { id },
  });
  return user.count > 0 ? id : null;
};

export default deleteUserById;
