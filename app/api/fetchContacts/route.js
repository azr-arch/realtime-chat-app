import User from "@models/user";
import { connectToDB } from "@utils/databse";
import { ApiResponse } from "@utils";
import { getServerSession } from "next-auth";

export async function GET(request) {
  try {
    const { user } = await getServerSession();
    await connectToDB();
    const contacts = await User.findOne({ email: user.email }).select(
      "contacts"
    );

    if (!contacts) {
      return ApiResponse("user doesnt exists", 404);
    }

    return ApiResponse(contacts, 201);
  } catch (error) {
    // console.error(error);
    return ApiResponse("An error occurred.", 500);
  }
}
