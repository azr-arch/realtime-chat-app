import { getServerSession } from "next-auth";
import User from "@models/user";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req) {
    try {
        const { user: currUser } = await getServerSession();
        const { imageUrl } = await req.json();

        const user = await User.findOne({ email: currUser?.email });

        if (!user) {
            return new NextResponse.json({ message: "User does not exists" }, { status: 403 });
        }

        await User.updateOne({ email: currUser?.email }, { avatar: imageUrl });
        return NextResponse.json({ success: "true" }, { status: 200 });
    } catch (error) {
        console.log("[UPDATE_USER]", error);
        return new NextResponse(error);
    }
}
