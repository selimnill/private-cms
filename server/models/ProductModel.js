import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.ObjectId, // get categories type useing mongoose objectID
      ref: "category", // reference value and Category Model passing string must be same
      required: true,
    },
    quantity: {
      type: Number,
      requierd: true,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    shipping: {
      type: Boolean,
    },
  },
  { timestamps: true }
); // timestamps for adding automically while create product

export default mongoose.model("Products", productSchema);
