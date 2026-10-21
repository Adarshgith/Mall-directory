import mongoose from "mongoose";

const storeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Store name is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["Food & Beverage", "Fashion", "Electronics", "Services"],
    },
    floor: {
      type: String,
      required: [true, "Floor/Location is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    openingHours: {
      type: String,
      default: "10:00 AM – 10:00 PM",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Store", storeSchema);