import ProfilePage from "@components/profile-page";
import { useUserServer } from "@hooks/use-user";
import { Suspense } from "react";

const Page = async () => {
    const data = await useUserServer();
    return (
        <div className="w-full h-full self-stretch flex flex-col items-center justify-center">
            <Suspense fallback={<p>Loading...</p>}>
                <ProfilePage data={data?.user} />
            </Suspense>
        </div>
    );
};

export default Page;
