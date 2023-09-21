import mongoose from "mongoose";

let isConnected = false;

export async function connectToDB() {
  if (isConnected) {
    console.log("db connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log("db connected");
  } catch (err) {
    console.log("error occured " + err);
  }
}
