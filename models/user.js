import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    status: {
      type: Boolean,
      default: true, // true = active, false = inactive
    },
    is_deleted: {
      type: Boolean,
      default: false, // false = not deleted
    },
    accessToken: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

/**
 * Pre-save hook: hash password before saving
 */
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // only hash if password is new/modified
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

/**
 * Method to compare entered password with hashed password
 */
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Prevent model overwrite in dev
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;