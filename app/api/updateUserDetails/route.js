import { connectToDB } from "@utils/databse";
import User from "@models/user";
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

export async function POST(req) {
  try {
    const data = await req.formData();
    //... handle further

    return new NextResponse({ message: "got it" }, { status: 201 });
  } catch (error) {
    return new NextResponse({ message: "got it" }, { status: 201 });
  }
}
