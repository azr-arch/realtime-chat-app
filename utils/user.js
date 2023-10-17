import { connectToDB } from "./databse";
import User from "@models/user";

async function checkUserExists(email) {
  await connectToDB();
  const user = await User.findOne({ email });
  return Boolean(user);
}

async function addToContactList(currUser, data) {
  try {
    await connectToDB();
    await User.findOneAndUpdate(
      { email: currUser },
      {
        // Add data in contacts array of user document
        $push: { contacts: data },
      }
    );
  } catch (error) {
    console.log("Error while updating contact list ", error.message);
  }
}

export { checkUserExists, addToContactList };
