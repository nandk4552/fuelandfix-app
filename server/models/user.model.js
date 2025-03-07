const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address",
      ],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Please provide a phone number"],
      unique: true,
      // match: [/^\+\d{1,3}\s\d{1,15}$/, "Please enter a valid phone number"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      min: 6,
      max: 64,
      //   select: false, // hide password in response
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
