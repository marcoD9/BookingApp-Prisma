import { PrismaClient } from "@prisma/client";

const updateBookingById = async (id, updatedBooking) => {
  const prisma = new PrismaClient();

  //Check if checkinDate is before checkoutDate
  const checkin = new Date(updatedBooking.checkinDate);
  const checkout = new Date(updatedBooking.checkoutDate);

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

  const booking = await prisma.booking.updateMany({
    where: { id },
    data: updatedBooking,
  });

  return booking.count > 0 ? id : null;
};

export default updateBookingById;
