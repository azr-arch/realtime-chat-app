import User from "@models/user";
import { connectToDB } from "@lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request) {
    try {
        const { user } = await getServerSession();
        await connectToDB();
        const data = await User.findOne({ email: user.email }).select("contacts");

        if (!data) {
            return new NextResponse("contacts doesnot exists");
        }

        return NextResponse.json({ contacts: data?.contacts }, { status: 200 });
    } catch (error) {
        console.log("[FETCH_CONTACTS]", error);
        return new NextResponse(error);
    }
}
