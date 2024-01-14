import User from "@models/user";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { user } = await getServerSession();
    try {
        if (!user) {
            return new NextResponse("Unauthenticated");
        }
        const { value } = await request.json();

        const userDetails = await User.findOne({
            email: value,
        }).select("email name");

        if (!userDetails) {
            return NextResponse.json({ notFound: true }, { status: 200 });
        }

        return NextResponse.json(userDetails, { status: 200 });
    } catch (error) {
        console.log("[SEARCH]", error);
        return new NextResponse(error);
    }
}
