const mongoose = require("mongoose");
const User = require("../models/user.js");
const generateToken = require("../middleware/tokenVerification.js");

/**
 *  @desc save the user in the database
 *  @route POST /user/signup
 */
async function createUser(req, res) {
  try {
    const {
      username,
      firstname,
      lastname,
      email,
      password,
      phoneNumber,
      countryCode,
      bio,
      privacy,
    } = req.body;

    // check if the user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        msg: "User already exists",
      });
    }

    const newuser = await User.create({
      username,
      firstname,
      lastname,
      email,
      password,
      phoneNumber,
      countryCode,
      bio,
      privacy,
    });
    console.log("User created successfully ", newuser._id);
    res.status(201).json({
      msg: "User signedUp successfully",
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({
        msg: "Validation Failed",
        errors,
      });
    } else if (err.code === 11000) {
      const duplicateField = Object.keys(err.keyValue)[0];
      return res.status(409).json({
        msg: `${duplicateField} must be unique`,
        duplicateValue: err.keyValue[duplicateField],
      });
    }
    console.log(err.stack);
    return res.status(500).json({
      msg: "Internal Server Error",
    });
  }
}

/**
 * @desc login user
 * @route POST /user/login
 */
async function loginUser(req, res, next) {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    let userExists;
    if (!email || !password)
      return res.status(400).json({
        msg: "Username or Password cannot be empty",
      });
    if (["@", ".com"].some((substr) => email.includes(substr))) {
      userExists = await User.findOne({ email, password }); // password has been passed simultaneously to save extra database call.
    } else {
      userExists = await User.findOne({ username: email, password });
    }
    if (userExists) {
      // user found, generate JWT-token
      // and save it to user browser localStorage.
      console.log("User Found", userExists._id);
      next();
    } else
      res.status(401).json({
        msg: "Username/Email or Password didn't match",
      });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
}

/**
 * @desc find a user
 * @route GET /user/:id
 */
async function findUser(req, res) {
  try {
    const { id } = req.params;
    if (!id)
      return res.status(400).json({
        msg: "User Id is required",
      });
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({
        msg: "User Id is not valid",
      });
    const userExists = await User.findById(id).select("-password"); //excludes password
    if(!userExists)
      return res.status(404).json({
        msg: "User not Found"
      });
    console.log(userExists._doc);
    return res.status(200).json({
      msg: "User found",
      user: userExists._doc
    })
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
}

module.exports = {
  createUser,
  loginUser,
  findUser,
};
