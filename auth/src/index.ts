import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  console.log("Stating Up...");
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
  app.listen(3000, () => {
    console.log(`Application restarted at ${new Date().toISOString()}`);
  });
};

start();
