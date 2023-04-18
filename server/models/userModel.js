import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlenght: 50 },
  email: { type: String, required: true, maxlenght: 50 },
  followers: { type: Number, required: true },
  settings: { type: String, required: true },
  password: { type: String, required: true, minlength: 8, maxlenght: 20 },
  groupes: { type: Number, required: true },
  chats: { type: String, required: true },
  posts: { type: String, required: true },
  otherinfo: { type: String, required: true, maxlenght: 50 },
});
const userModel = mongoose.model("Users", userSchema);

export default userModel