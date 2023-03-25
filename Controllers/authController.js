import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  try {
    // hashgin password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      photo: req.body.photo,
    });

    await newUser.save();
    res.status(200).json({ success: true, message: "sucessfully created" });
  } catch (error) {
    res.status(500).json({ success: false, message: "user creation failed" });
  }
};
// login
export const login = async (req, res) => {
  const email = req.body.email;

  try {
    // if user exist or not
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    }

    // if password incorrect
    const checkCorrectPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!checkCorrectPassword) {
      return res
        .status(401)
        .json({ success: false, message: "incorrect email or password" });
    }
    const { password, role, ...rest } = user._doc;

    // create jwt
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "15d" }
    );

    // set token in the brwser cookies and used for client side

    res
      .cookie("accessToken", token, {
        httpOnly: true,
        expiresIn: token.expiresIn,
      })
      .status(200)
      .json({
        success: true,
        message: "successfully login",
        token: token,
        role: role,
        data: { ...rest },
      });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to login" });
  }
};
