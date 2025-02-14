import { PrismaClient } from "@prisma/client";

const createBooking = async (
  userId,
  propertyId,
  checkinDate,
  checkoutDate,
  numberOfGuests
) => {
  const prisma = new PrismaClient();

  // 1. Check if userId and propertyId exist
  const [user, property] = await Promise.all([
    prisma.user.findUnique({ where: { id: userId } }),
    prisma.property.findUnique({
      where: { id: propertyId },
      select: { pricePerNight: true },
    }),
  ]);

  if (!user) {
    throw new Error(`User with ID ${userId} not found.`);
  }

  if (!property) {
    throw new Error(`Property with ID ${propertyId} not found.`);
  }

  // 2. Find the total price based on checkin and checkout dates
  const checkin = new Date(checkinDate);
  const checkout = new Date(checkoutDate);

  if (isNaN(checkin) || isNaN(checkout)) {
    throw new Error(
      "Invalid checkin or checkout date format. Dates must be valid."
    );
  }

  const numberOfNights =
    (checkout.getTime() - checkin.getTime()) / (1000 * 60 * 60 * 24);
  if (numberOfNights < 0) {
    throw new Error("Checkout date cannot be before checkin date.");
  }

  const totalPrice = property.pricePerNight * numberOfNights;

  // 3. Set bookingStatus on pending by default
  const bookingStatus = "pending";

  // 4. Return booking
  const booking = await prisma.booking.create({
    data: {
      user: { connect: { id: userId } }, // Connect the user
      property: { connect: { id: propertyId } }, // Connect the property
      checkinDate: checkin,
      checkoutDate: checkout,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    },
  });

  return booking;
};

export default createBooking;
