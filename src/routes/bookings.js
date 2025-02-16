import { Router } from "express";
import getBookings from "../services/bookings/getBookings.js";
import getBookingByd from "../services/bookings/getBookingById.js";
import createBooking from "../services/bookings/createBooking.js";
import updateBookingById from "../services/bookings/updateBookingById.js";
import deleteBookingById from "../services/bookings/deleteBookingById.js";
import auth from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const bookings = await getBookings();
    res.json(bookings);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const booking = await getBookingByd(id);
    if (!booking) {
      res
        .status(404)
        .json({ message: `Booking with id ${id} has not been found!` });
    } else {
      res.json(booking);
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", auth, async (req, res, next) => {
  try {
    const { userId, propertyId, checkinDate, checkoutDate, numberOfGuests } =
      req.body;
    const booking = await createBooking(
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests
    );
    if (req.body.totalPrice || req.body.bookingStatus) {
      res
        .status(400)
        .json({ message: `Total price and booking status cannot be updated!` });
    }

    res.status(201).json(booking);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", auth, async (req, res, next) => {
  try {
    const { checkinDate, checkoutDate, numberOfGuests } = req.body;
    const { id } = req.params;
    const booking = await updateBookingById(id, {
      checkinDate,
      checkoutDate,
      numberOfGuests,
    });

    if (
      req.body.totalPrice ||
      req.body.bookingStatus ||
      req.body.userId ||
      req.body.propertyId
    ) {
      res.status(400).json({ message: `You cannot update these fields!` });
    }
    if (booking) {
      res.status(200).send({
        message: `Booking with id ${id} has been successfully updated!`,
        booking,
      });
    } else {
      res
        .status(404)
        .json({ message: `Booking with id ${id} has not been found!` });
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const booking = await deleteBookingById(id);
    if (booking) {
      res
        .status(200)
        .send({ message: `Booking with id ${id} has been deleted!`, booking });
    } else {
      res
        .status(404)
        .json({ message: `Booking with id ${id} has not been found!` });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
