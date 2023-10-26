import User from "@models/user";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        // const { user: currUser } = await getServerSession(context.req);
        // await connectToDB();
        // const user = await User.findOne({ email: currUser.email }).select("_id name email avatar");
        return new NextResponse.json({ data: { name: "true" } }, { status: 200 });
    } catch (error) {
        console.log("[GET_CURRENTUSER]", error);
    }
}
