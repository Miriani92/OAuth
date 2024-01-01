import mongoose from "mongoose";
// @ts-ignore
import bcrypt from "bcryptjs";

export interface UserDocument {
  email: string;
  name: string;
  picture: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    picture: { type: String },
  },
  {
    timestamps: true,
  }
);

// userSchema.pre("save", async function (next) {
//   let user = this as UserDocument;

//   if (!user.isModified("password")) {
//     return next();
//   }

//   const salt = await bcrypt.genSalt(process.env.SALT_SECRET);

//   const hash = await bcrypt.hashSync(user.password, salt);

//   user.password = hash;

//   return next();
// });

// userSchema.methods.comparePassword = async function (
//   candidatePassword: string
// ): Promise<boolean> {
//   const user = this as UserDocument;

//   return bcrypt.compare(candidatePassword, user.password).catch(() => false);
// };

export const UserModel = mongoose.model<UserDocument>("Users", userSchema);
