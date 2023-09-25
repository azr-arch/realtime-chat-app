import Profile from "@components/Profile";
import { getServerSession } from "next-auth";

const page = async () => {
  const session = await getServerSession();
  return <Profile session={session} />;
};

export default page;
