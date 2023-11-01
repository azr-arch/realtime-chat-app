import mongoose from "mongoose";

let isConnected = false;

export async function connectToDB() {
    if (isConnected) {
        console.log("db connected from database config");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        isConnected = true;
        console.log("db connected from database config");
    } catch (err) {
        console.log("error occured " + err);
    }
}
