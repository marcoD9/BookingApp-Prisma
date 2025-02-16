import { Router } from "express";
import getReviews from "../services/reviews/getReviews.js";
import getReviewById from "../services/reviews/getReviewById.js";
import deleteReviewById from "../services/reviews/deleteReviewById.js";
import createReview from "../services/reviews/createReview.js";
import updateReviewById from "../services/reviews/updateReviewById.js";
import auth from "../middleware/auth.js";
import validateFields from "../middleware/validateMiddleware.js";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const reviews = await getReviews();
    res.json(reviews);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const review = await getReviewById(id);
      if (!review) {
        res
          .status(404)
          .json({ message: `Review with id ${id} has not been found!` });
      } else {
        res.status(200).json(review);
      }
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

router.delete(
  "/:id",
  auth,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const review = await deleteReviewById(id);
      if (review) {
        res.status(200).send({
          message: `Review with id ${id} successfully deleted!`,
          review,
        });
      } else {
        res
          .status(404)
          .json({ message: `Review with id ${id} has not been found!` });
      }
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

router.post(
  "/",
  auth,
  validateFields(["userId", "propertyId", "rating", "comment"]),
  async (req, res, next) => {
    try {
      const { userId, propertyId, rating, comment } = req.body;
      const review = await createReview(userId, propertyId, rating, comment);
      res.status(201).json(review);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  auth,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { userId, propertyId, rating, comment } = req.body;

      const review = await updateReviewById(id, {
        userId,
        propertyId,
        rating,
        comment,
      });
      if (review) {
        res.status(200).send({
          message: `Review with id ${id} has been successfully updated!`,
          review,
        });
      } else {
        res
          .status(404)
          .json({ message: `Review with id ${id} has not been found!` });
      }
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

export default router;
