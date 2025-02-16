import { PrismaClient } from "@prisma/client";

const createBooking = async (
  userId,
  propertyId,
  checkinDate,
  checkoutDate,
  numberOfGuests,
  totalPrice,
  bookingStatus
) => {
  const prisma = new PrismaClient();

  const booking = await prisma.booking.create({
    data: {
      user: { connect: { id: userId } }, // Connect the user
      property: { connect: { id: propertyId } }, // Connect the property
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    },
  });

  return booking;
};

export default createBooking;
