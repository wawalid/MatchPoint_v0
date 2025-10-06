import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true, unique: true },
    // email: { type: String, required: false, unique: true },
    password: { type: String, required: true },
    ciudad: { type: String, required: false },
    avatar: { type: String, default: null },
    // is_admin: { type: Boolean, default: false },
    // is_banned: { type: Boolean, default: false },
    dni: { type: String, default: null },
    premium: { type: Boolean, default: false },
    fecha_registro: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
