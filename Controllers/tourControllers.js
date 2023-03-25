import Tour from "../models/Tour.js";

// create new tour
export const createTour = async (req, res) => {
  const newTour = new Tour(req.body);
  try {
    const savedTour = await newTour.save();
    res.status(200).json({
      success: true,
      message: "created successfully",
      data: savedTour,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "failed to create tour. Please try again",
    });
  }
};

// update tour
export const updateTour = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedTour = await Tour.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "tour updated successful",
      data: updatedTour,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "tour updated failed",
    });
  }
};
// deleteTour
export const deleteTour = async (req, res) => {
  const id = req.params.id;

  try {
    await Tour.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "tour deleted successful",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Tour Deleted",
    });
  }
};
// getSingleTour
export const getSingleTour = async (req, res) => {
  const id = req.params.id;

  try {
    const singleTour = await Tour.findById(id).populate("reviews");

    res.status(200).json({
      success: true,
      message: "single tour fetch success full...",
      data: singleTour,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Tour Not found......",
    });
  }
};
// get all tour
export const getAllTour = async (req, res) => {
  // paginaiton
  const page = parseInt(req.query.page);

  try {
    const tours = await Tour.find({})
      .populate("reviews")
      .skip(page * 8)
      .limit(8);
    res.status(200).json({
      success: true,
      count: tours.length,
      message: "success fully get all the data",
      data: tours,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "not found data",
    });
  }
};

// get Tour by search
export const getTourBySearch = async (req, res) => {
  // i means case sensitive
  const city = new RegExp(req.query.city, "i");
  const distance = parseInt(req.query.distance);
  const maxGroupSize = parseInt(req.query.maxGroupSize);

  try {
    // gte means greater than equal
    const tours = await Tour.find({
      city,
      distance: { $gte: distance },
      maxGroupSize: { $gte: maxGroupSize },
    }).populate("reviews");
    res.status(200).json({
      success: true,
      message: "successful",
      data: tours,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Search Not found......",
    });
  }
};
// get Tour getFeatured
export const getFeatured = async (req, res) => {
  try {
    // gte means greater than equal
    const tours = await Tour.find({ featured: true })
      .populate("reviews")
      .limit(8);
    res.status(200).json({
      success: true,
      message: "successful",
      data: tours,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Search Not found......",
    });
  }
};
export const getTourByCount = async (req, res) => {
  try {
    const tourCount = await Tour.estimatedDocumentCount();
    res.status(200).json({
      success: true,
      data: tourCount,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "data by count not found",
    });
  }
};
