import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    mobileNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    profilePic: {
      type: String,
      default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    },
    createdEvents: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event'
    }],
    eventAttendees: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event'
    }]
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;