import ProfilePage from "@components/profile-page";
import { getUser } from "@utils/getCurrUser";

const page = async () => {
    const data = await getUser();
    return (
        <div className="w-full h-full self-stretch flex flex-col items-center justify-center">
            <ProfilePage data={data?.user} />
        </div>
    );
};

export default page;
