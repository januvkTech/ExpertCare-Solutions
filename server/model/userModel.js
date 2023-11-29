const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    max: 50,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  customer: {
    type: Boolean,
    required: true,
  },
  active: {
    type: Boolean,
    required: false,
    default: false,
  },
  companyName: {
    type: String,
    required: false,
  },
  isAvatarImageSet: {
    type: Boolean,
    default: false,
  },
  avatarImage: {
    type: String,
    default: "",
  },
  verified: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: true,
    // expires: 3600,
  },
});
module.exports = mongoose.model("userInfo", userSchema);
