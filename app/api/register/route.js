import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { connectToDB } from "@lib/db";
import User from "@models/user";

export const dynamic = "force-dynamic";

export async function POST(req) {
    try {
        const { email, password } = await req.json();
        const hashedPassword = await bcrypt.hash(password, 10);

        await connectToDB();
        await userExists(email);

        await User.create({
            email,
            password: hashedPassword,
            name: email.split("@")[0],
        });

        return NextResponse.json({ success: true, message: "User registered!" }, { status: 201 });
    } catch (err) {
        return NextResponse.json({ success: false, message: err.message }, { status: 500 });
    }
}

async function userExists(email) {
    const user = await User.findOne({ email });
    if (user) throw new Error("Email already registered");
    return;
}
