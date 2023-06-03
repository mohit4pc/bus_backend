const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
let userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    mobile: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: {
      type: String,
      default: "user",
    },
    isblocked: {
      type: Boolean,
      default: false,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    stripe_account_id: String,
    stripe_seller: {},
    stripeSession: {},
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
userSchema.methods.isPasswordMatched = async function (enteredpassword) {
  return await bcrypt.compare(enteredpassword, this.password);
};
module.exports = mongoose.model("User", userSchema);
