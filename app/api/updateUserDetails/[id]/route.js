import { connectToDB } from "@utils/databse";
import User from "@models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req, { params }) {
  try {
    const { id } = params;
    const updateData = await req.json();
    if (updateData.password) {
      updateData.password = bcrypt.hash(updateData.password, 10);
    }
    await User.updateOne({ _id: id }, updateData);
    return new NextResponse({ success: true }, { status: 201 });
  } catch (error) {
    return new NextResponse({ error: error }, { status: 500 });
  }
}
