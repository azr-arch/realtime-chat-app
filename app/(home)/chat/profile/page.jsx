import ProfilePage from "@components/profile-page";
import { connectToDB } from "@lib/db";
import User from "@models/user";
import { Loader } from "lucide-react";
import { getServerSession } from "next-auth";
import { Suspense } from "react";

const Page = async () => {
    await connectToDB();
    const data = await getServerSession();

    if (!data?.user) return null;

    const user = await User.findOne({ email: data.user.email }).select("_id name email avatar");
    if (!user) return null;

    const obj = { ...user.toObject(), _id: user._id.toString() };
    return (
        <div className="w-full h-full self-stretch flex flex-col items-center justify-center">
            <Suspense fallback={<Loader className="w-5 h-5 animate-spin" />}>
                <ProfilePage data={obj} />
            </Suspense>
        </div>
    );
};

export default Page;
