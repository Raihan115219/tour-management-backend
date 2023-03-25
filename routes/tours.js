import express from "express";
import {
  getFeatured,
  createTour,
  deleteTour,
  getSingleTour,
  updateTour,
  getAllTour,
  getTourBySearch,
  getTourByCount,
} from "../Controllers/tourControllers.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// create tour new
router.post("/", verifyAdmin, createTour);

// update tour
router.put("/:id", verifyAdmin, updateTour);

// delete tour
router.delete("/:id", verifyAdmin, deleteTour);

// get single tour
router.get("/:id", getSingleTour);

// get all tour
router.get("/", getAllTour);
// getTourBySearch
router.get("/search/getTourBySearch", getTourBySearch);
// get Featured
router.get("/search/getFeatured", getFeatured);
// get tour by count
router.get("/search/getTourByCount", getTourByCount);

export default router;
