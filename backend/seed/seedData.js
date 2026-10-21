import mongoose from "mongoose";
import dotenv from "dotenv";
import Store from "../models/Store.js";

dotenv.config();

const stores = [
  {
    name: "Bean & Brew",
    category: "Food & Beverage",
    floor: "Level 1",
    description: "Premium coffee, tea and light snacks in a cozy atmosphere.",
    openingHours: "8:00 AM – 10:00 PM",
  },
  {
    name: "Pizza Palace",
    category: "Food & Beverage",
    floor: "Level 2",
    description: "Authentic Italian pizzas and pastas made fresh daily.",
    openingHours: "11:00 AM – 11:00 PM",
  },
  {
    name: "Burger Barn",
    category: "Food & Beverage",
    floor: "Level 1",
    description: "Juicy burgers, crispy fries and refreshing shakes.",
    openingHours: "10:00 AM – 10:00 PM",
  },
  {
    name: "Zara",
    category: "Fashion",
    floor: "Level 2",
    description: "Latest trends in clothing, accessories and footwear.",
    openingHours: "10:00 AM – 9:00 PM",
  },
  {
    name: "H&M",
    category: "Fashion",
    floor: "Level 3",
    description: "Affordable fashion for men, women and kids.",
    openingHours: "10:00 AM – 9:00 PM",
  },
  {
    name: "iStore",
    category: "Electronics",
    floor: "Level 1",
    description: "Official Apple products, accessories and repairs.",
    openingHours: "9:00 AM – 9:00 PM",
  },
  {
    name: "Samsung Experience",
    category: "Electronics",
    floor: "Level 2",
    description: "Latest Samsung phones, TVs, and smart home devices.",
    openingHours: "9:00 AM – 9:00 PM",
  },
  {
    name: "CleanPro Laundry",
    category: "Services",
    floor: "Level 3",
    description: "Professional dry cleaning and laundry services.",
    openingHours: "8:00 AM – 8:00 PM",
  },
  {
    name: "SnapShot Studio",
    category: "Services",
    floor: "Level 1",
    description: "Professional photography and passport photo services.",
    openingHours: "10:00 AM – 7:00 PM",
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected...");

    await Store.deleteMany();
    console.log("Old data cleared...");

    await Store.insertMany(stores);
    console.log("Sample data inserted successfully!");

    process.exit(0);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedDB();