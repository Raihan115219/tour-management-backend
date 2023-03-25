import User from "../models/User.js";

// create new User
export const createUser = async (req, res) => {
  const newUser = new User(req.body);
  try {
    const savedUser = await newUser.save();
    res.status(200).json({
      success: true,
      message: "created successfully",
      data: savedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "failed to create User. Please try again",
    });
  }
};

// update User
export const updateUser = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "User updated successful",
      data: updatedUser,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "User updated failed",
    });
  }
};
// deleteUser
export const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    await User.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "User deleted successful",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "User Deleted",
    });
  }
};
// getSingleUser
export const getSingleUser = async (req, res) => {
  const id = req.params.id;

  try {
    const singleUser = await User.findById(id);

    res.status(200).json({
      success: true,
      message: "single User fetch success full...",
      data: singleUser,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "User Not found......",
    });
  }
};
// get all User
export const getAllUser = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      success: true,
      message: "success fully get all the data",
      data: users,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "not found data",
    });
  }
};
