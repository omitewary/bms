import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }

  try {
    await mongoose.connect("mongodb://auth-mongo-srv/auth");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
  app.listen(3000, () => {
    console.log(`Application restarted at ${new Date().toISOString()}`);
  });
};

start();
