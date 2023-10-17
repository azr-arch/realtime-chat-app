import User from "@models/user";
import { connectToDB } from "@utils/databse";
import { addToContactList } from "@utils/user";
import { ApiResponse } from "@utils";

export async function POST(request) {
  try {
    const { currUser, personToAdd } = await request.json();
    await connectToDB();

    const newContact = await User.findOne({ email: personToAdd }).select(
      " _id email name avatar"
    );

    if (!newContact) {
      return ApiResponse("The user you want to add, doesnt exists", 404);
    }

    // Update the currUser Contact document
    await addToContactList(currUser, newContact);

    return ApiResponse(newContact, 201);
  } catch (error) {
    // console.log(error);
    return ApiResponse("An error occurred.", 500);
  }
}
