import { connectToDB } from "./databse";
import User from "@models/user";

async function checkUserExists(email) {
  await connectToDB();
  const user = await User.findOne({ email });
  return Boolean(user);
}

export { checkUserExists };
