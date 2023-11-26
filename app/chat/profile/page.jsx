import ProfilePage from "@components/profile-page";
import { connectToDB } from "@lib/db";
import User from "@models/user";
import { getServerSession } from "next-auth";
import { Suspense } from "react";

const Page = async () => {
    const db = await connectToDB();
    const data = await getServerSession();

    if (!data?.user) return null;

    const user = await User.findOne({ email: data.user.email }).select("_id name email avatar");

    if (!user) return null;
    return (
        <div className="w-full h-full self-stretch flex flex-col items-center justify-center">
            <Suspense fallback={<p>Loading...</p>}>
                <ProfilePage data={user.toObject()} />
            </Suspense>
        </div>
    );
};

export default Page;
