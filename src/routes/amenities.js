import { Router } from "express";
import getAmenities from "../services/amenities/getAmenities.js";
import getAmenityById from "../services/amenities/getAmenityById.js";
import createAmenity from "../services/amenities/createAmenity.js";
import updateAmenityById from "../services/amenities/updateAmenityById.js";
import deleteAmenityById from "../services/amenities/deleteAmenityById.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const amenities = await getAmenities();
    res.json(amenities);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const amenity = await getAmenityById(id);
    if (!amenity) {
      res
        .status(404)
        .json({ message: `Amenity with id ${id} has not been found!` });
    } else {
      res.json(amenity);
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const name = req.body;
    const amenity = await createAmenity(name);
    res.status(201).json(amenity);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const name = req.body;
    const amenity = await updateAmenityById(id, name);
    if (amenity) {
      res.status(200).send({
        message: `Amenity with id ${id} has been successfully updated!`,
        amenity,
      });
    } else {
      res
        .status(404)
        .json({ message: `Amenity with id ${id} has not been found!` });
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const amenity = await deleteAmenityById(id);
    if (amenity) {
      res.status(200).send({
        message: `Amenity with id ${id} has been successfully deleted!`,
        amenity,
      });
    } else {
      res
        .status(404)
        .json({ message: `Amenity with id ${id} has not been found!` });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
