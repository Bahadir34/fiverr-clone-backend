import { model, Schema } from "mongoose";

const gigSchema = new Schema(
  {
    user: {
      type: Schema.ObjectId,
      ref: "User",
      required: [true, "User field is required!"],
    },
    title: {
      type: String,
      required: [true, "Gig has to have a title!"],
      trim: true, // gig in basinda ve sonunda space varsa onlari siler
    },
    description: {
      type: String,
      required: [true, "Gig has to have a description!"],
      minLength: [
        15,
        "Gig's description must be created at least 15 characters!",
      ],
      maxLength: [
        500,
        "Gig's description must be created maximum 500 characters!",
      ],
      trim: true,
    },
    reviewCount: {
      type: Number,
      defaul: 0,
    },
    category: {
      type: String,
      required: [true, "Category is required field!"],
      trim: true,
    },
    coverImage: {
      type: String,
      required: [true, "Cover Image is required data to create a gig!"],
      // ilk başta default value koydum
      default:
        "https://logos-world.net/wp-content/uploads/2020/12/Fiverr-Logo.png",
    },
    images: {
      type: [String],
      required: true,
    },
    rating: {
      type: Number,
      required: [true, "Rating is required!"],
    },
    packageTitle: {
      type: String,
      required: [true, "Package Title is required field!"],
    },
    packageDescription: {
      type: String,
      required: [true, "Package Description is required field!"],
    },
    packagePrice: {
      type: Number,
      required: [true, "Package Price is required field!"],
    },
    packageFeatures: {
      type: [String],
      required: [true, "Package Features is required field!"],
    },
    packageDuration: {
      type: Number,
      required: [true, "Package Duration is required field!"],
    },
    packageRevisions: {
      type: Number,
      required: [true, "Package Revisions is required field!"],
    },
  },
  {
    timestamps: true,
  }
);

export const Gig = model("Gig", gigSchema);
