const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");
const validateMongodbId = require("../config/validateMongoDbID");
const registerAUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    const createUser = await User.create(req.body);
    res.status(200).json({
      status: true,
      message: "User Created Successfully !",
    });
  } else {
    throw new Error("User Already Exists");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const findUser = await User.findOne({ email: email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    res.status(200).json({
      status: true,
      message: "Logged In Successfully",
      token: generateToken(findUser?._id),
      username: findUser?.fullname,
    });
  }
});
const getAllUser = asyncHandler(async (req, res) => {
  try {
    const alluser = await User.find();
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 1;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const users = [alluser];
    const paginatedUsers = users.slice(startIndex, endIndex);
    res.status(200).json({
      status: true,
      message: "All Donor Fetched Successfully",
      paginatedUsers,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongodbId(_id);
  try {
    const user = await User.findByIdAndUpdate(_id, req.body, { new: true });
    res.status(200).json({
      status: true,
      message: "Profile Updated Successfully!",
      user,
    });
  } catch (error) {
    throw new Error(error);
  }
});
// const deleteUser = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   validateMongodbId(_id);
//   try {
//     await User.findByIdAndDelete(id);
//     res.status(200).json({
//       status: true,
//       message: "User Deleted Successfuly",
//     });
//   } catch (error) {
//     throw new Error(error);
//   }
// });
const getAUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(_id);
  try {
    const getProfile = await User.findById(id);
    res.status(200).json({ status: true, message: "User Found", getProfile });
  } catch (error) {
    throw new Error(error);
  }
});
const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const block = await User.findByIdAndUpdate(
      id,
      { isblocked: true },
      { new: true }
    );
    res
      .status(200)
      .json({ status: true, message: "User Blocked Successfully" });
  } catch (error) {
    throw new Error(error);
  }
});
const unblockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const Unblock = await User.findByIdAndUpdate(
      id,
      { isblocked: true },
      { new: true }
    );
    res
      .status(200)
      .json({ status: true, message: "User UnBlocked Successfully" });
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  registerAUser,
  loginUser,
  getAllUser,
  updateUser,
  // deleteUser,
  getAUser,
  blockUser,
  unblockUser,
};
