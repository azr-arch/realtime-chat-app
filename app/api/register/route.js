import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { connectToDB } from "@utils/databse";
import User from "@models/user";
export async function POST(req) {
  try {
    const { email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);

    await connectToDB();

    console.log("connected to db in register api");

    await User.create({
      email,
      password: hashedPassword,
      name: email.split("@")[0],
    });

    console.log("ccreated user");
    return NextResponse.json({ message: "User registered!" }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { message: "An error occured while registering user" },
      { status: 500 }
    );
  }
}
