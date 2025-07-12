import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.users || mongoose.model("users", userSchema);
