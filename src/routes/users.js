import { Router } from "express";
import getUsers from "../services/users/getUsers.js";
import auth from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

export default router;
