const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  
  username: String,
  email: String,
  password: String,
  date: {
    type: Date,
    default: Date.now,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model("user", userSchema);
