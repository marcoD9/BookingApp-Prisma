import { Router } from "express";
import getProperties from "../services/properties/getProperties.js";
import getPropertyById from "../services/properties/getPropertyById.js";
import createProperty from "../services/properties/createProperty.js";
import updatePropertyById from "../services/properties/updatePropertyById.js";
import deletePropertyById from "../services/properties/deletePropertyById.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const properties = await getProperties();
    res.json(properties);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const property = await getPropertyById(id);
    if (!property) {
      res
        .status(404)
        .json({ message: `Property with id ${id} has not been found!` });
    } else {
      res.status(200).json(property);
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const {
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      hostId,
      rating,
    } = req.body;
    const newProperty = await createProperty(
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      hostId,
      rating
    );
    res.status(201).json(newProperty);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const {
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      hostId,
      rating,
    } = req.body;
    const { id } = req.params;
    const property = await updatePropertyById(id, {
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      hostId,
      rating,
    });
    if (property) {
      res
        .status(200)
        .send({ message: `Property with id ${id} has been updated`, property });
    } else {
      res
        .status(404)
        .json({ message: `Property with id ${id} has not been found` });
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const property = await deletePropertyById(id);
    if (property) {
      res
        .status(200)
        .send({
          message: `Property with id ${id} successfully deleted!`,
          property,
        });
    } else {
      res
        .status(404)
        .json({ message: `Property with id ${id} has not been found!` });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
