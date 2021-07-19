import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required:  true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
  following: [Object],
  about: String,
  interests: String,
  image: String
});

export default mongoose.model("User", userSchema);