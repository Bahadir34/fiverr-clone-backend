import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required field!"],
      unique: [true, "Your username is taken by an other user"],
    },
    email: {
      type: String,
      required: [true, "Email is required field"],
      unique: [true, "The email entered by you is using in app!"],
    },
    password: {
      type: String,
      required: [true, "Please enter a password!"],
    },
    photo: {
      type: String,
      default:
        "https://w7.pngwing.com/pngs/574/369/png-transparent-avatar-computer-icons-user-random-icons-purple-blue-heroes.png",
    },
    country: {
      type: String,
      required: [true, "Please enter your country!"],
    },
    isSeller: {
      type: Boolean,
      required: [true, "Please enter Seller situation!"],
    },
    phone: {
      type: Number,
    },
  },
  { timestamps: true } // otomatik olarak createdAt ve updatedAt field'lari eklenir
);

userSchema.pre("save", function () {
  this.password = bcrypt.hashSync(this.password, 12);
});

export default model("User", userSchema); // export ederken modelin Ismi yazilir ve kullanilan Schema verilir
