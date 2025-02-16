import { Router } from "express";
import getHosts from "../services/hosts/getHosts.js";
import getHostById from "../services/hosts/getHostById.js";
import createHost from "../services/hosts/createHost.js";
import updateHostById from "../services/hosts/updateHostById.js";
import deleteHostById from "../services/hosts/deleteHostById.js";
import auth from "../middleware/auth.js";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";
import validateFields from "../middleware/validateMiddleware.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const { name } = req.query;
    const hosts = await getHosts(name);
    res.json(hosts);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const host = await getHostById(id);
      if (!host) {
        res
          .status(404)
          .json({ message: `Host with id ${id} has not been found!` });
      } else {
        res.json(host);
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
  validateFields([
    "username",
    "password",
    "name",
    "email",
    "phoneNumber",
    "profilePicture",
    "aboutMe",
  ]),
  async (req, res, next) => {
    try {
      const {
        username,
        password,
        name,
        email,
        phoneNumber,
        profilePicture,
        aboutMe,
      } = req.body;
      const host = await createHost(
        username,
        password,
        name,
        email,
        phoneNumber,
        profilePicture,
        aboutMe
      );
      res.status(201).json(host);
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
      const {
        username,
        password,
        name,
        email,
        phoneNumber,
        profilePicture,
        aboutMe,
      } = req.body;
      const host = await updateHostById(id, {
        username,
        password,
        name,
        email,
        phoneNumber,
        profilePicture,
        aboutMe,
      });

      if (host) {
        res
          .status(200)
          .send({ message: `Host with id ${id} has been updated`, host });
      } else {
        res
          .status(404)
          .json({ message: `Host with id ${id} has not been found` });
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
      const host = await deleteHostById(id);
      if (host) {
        res.status(200).send({
          message: `Host with id ${id} has been successfully deleted!`,
          host,
        });
      } else {
        res
          .status(404)
          .json({ message: `Host with  id ${id} has not been found!` });
      }
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

export default router;
