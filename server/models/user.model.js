import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email inválido"],
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false }, //"select: false" lo excluye por defecto de las queries para mayor seguridad
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.comparePassword = function (input) {
  return bcrypt.compare(input, this.password);
};

export default mongoose.model("User", userSchema);
