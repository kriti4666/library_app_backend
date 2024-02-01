const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: 
    { type: String, enum: ["CREATOR", "VIEW_ALL"], default: "VIEW_ALL" },
  
});

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
