import { PrismaClient } from "@prisma/client";

const createReview = async (userId, propertyId, rating, comment) => {
  const prisma = new PrismaClient();
  // Check if userId and propertyId exist
  const [user, property] = await Promise.all([
    prisma.user.findUnique({ where: { id: userId } }),
    prisma.property.findUnique({
      where: { id: propertyId },
    }),
  ]);

  if (!user) {
    throw new Error(`User with ID ${userId} not found.`);
  }

  if (!property) {
    throw new Error(`Property with ID ${propertyId} not found.`);
  }
  const review = await prisma.review.create({
    data: {
      user: { connect: { id: userId } },
      property: { connect: { id: propertyId } },
      rating,
      comment,
    },
  });

  return review;
};

export default createReview;
