import ProfilePage from "@components/profile-page";
import { useUserServer } from "@hooks/use-user";

const page = async () => {
    const data = await useUserServer();
    return (
        <div className="w-full h-full self-stretch flex flex-col items-center justify-center">
            <ProfilePage data={data?.user} />
        </div>
    );
};

export default page;
