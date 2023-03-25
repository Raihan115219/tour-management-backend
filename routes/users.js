import express from "express";
import {
  createUser,
  deleteUser,
  getAllUser,
  getSingleUser,
  updateUser,
} from "../Controllers/userController.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();
// create user
router.post("/", verifyUser, createUser);
// update tour
router.put("/:id", verifyUser, updateUser);

// delete User
router.delete("/:id", verifyUser, deleteUser);

// get single User
router.get("/:id", verifyUser, getSingleUser);

// get all User
router.get("/", verifyAdmin, getAllUser);

export default router;
