import User from "@models/user";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { connectToDB } from "@lib/db";

export async function GET(req) {
    const { user: currUser } = await getServerSession();
    try {
        if (!currUser) {
            return new NextResponse("Unauthorized");
        }
        await connectToDB();
        const user = await User.findOne({ email: currUser.email }).select("_id name email avatar");
        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        console.log("[GET_CURRENTUSER]", error);
        return new NextResponse(error);
    }
}
