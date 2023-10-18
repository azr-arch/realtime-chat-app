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

    // Check if contact already exists
    const user = await User.findOne({ email: currUser });
    const contactExists = user.contacts.some(
      (contact) => contact.email === data.email
    );

    if (contactExists) {
      console.log("Contact already exists.");
      return;
    }

    // Add data in contacts array of user document
    await User.findOneAndUpdate(
      { email: currUser },
      { $push: { contacts: data } }
    );

    console.log("Contact added successfully.");
  } catch (error) {
    console.log("Error while updating contact list ", error.message);
  }
}

export { checkUserExists, addToContactList };
