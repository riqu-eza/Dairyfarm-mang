import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'Owner',
    },
  },
{timestamps:true}
);

const User = mongoose.model("Users", UserSchema);

export default User;

