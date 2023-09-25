import User from "@models/user";
import { connectToDB } from "@utils/databse";
import { NextResponse } from "next/server";

export async function POST(request) {
  const email = await request.json();

  await connectToDB();
  const user = await User.findOne({ email });
  return NextResponse.json({ user }, { status: 200 });
}
