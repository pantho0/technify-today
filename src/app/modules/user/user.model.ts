import { model, Schema } from "mongoose";
import { IUser, UserModel } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const userSchema = new Schema<IUser, UserModel>(
  {
    firstName: {
      type: String,
      required: true,
    },

    middleName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    profileImage: {
      type: String,
      required: false,
    },
    followers: {
      type: [Schema.Types.ObjectId],
    },
    followed: {
      type: [Schema.Types.ObjectId],
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.statics.isUserExists = async function (email) {
  return await User.findOne({ email: email }).select("+password");
};

userSchema.pre("save", async function (next) {
  const user = this as IUser;
  user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt));
  next();
});

userSchema.post("save", function (doc, next) {
  doc.password = "**********";
  next();
});

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const User = model<IUser, UserModel>("User", userSchema);
