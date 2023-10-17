import User from "@models/user";
import { connectToDB } from "@utils/databse";
import { ApiResponse } from "@utils";

export async function POST(request) {
  try {
    const email = await request.json();
    console.log("email :", email);
    await connectToDB();

    const user = await User.findOne({ email });
    if (!user) {
      return ApiResponse("user doesnt exists", 404);
    }

    const contacts = await User.findById(user._id).select("contacts");
    return ApiResponse(contacts, 201);
  } catch (error) {
    // console.error(error);
    return ApiResponse("An error occurred.", 500);
  }
}
