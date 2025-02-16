import { PrismaClient } from "@prisma/client";

const createReview = async (userId, propertyId, rating, comment) => {
  const prisma = new PrismaClient();
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
