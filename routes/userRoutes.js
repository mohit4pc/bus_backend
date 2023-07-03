const express = require("express");
const {
  registerAUser,
  loginUser,
  getAllUser,
  updateUser,
  // deleteUser,
  getAUser,
  blockUser,
  unblockUser,
} = require("../controllers/userCtrl");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddlware");
const userRouter = express.Router();

userRouter.post("/register", registerAUser);
userRouter.post("/login", loginUser);
userRouter.get("/getAlldonor", authMiddleware, isAdmin, getAllUser);
// userRouter.delete("/:id", authMiddleware, isAdmin, deleteUser);
userRouter.get("/:id", authMiddleware, getAUser);
userRouter.put("/update-profile", authMiddleware, updateUser);
userRouter.put("/block/:id", authMiddleware, isAdmin, blockUser);
userRouter.put("/un-block/:id", authMiddleware, isAdmin, unblockUser);

module.exports = userRouter;
