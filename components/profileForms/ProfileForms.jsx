import Divider from "@components/Divider";
import { useSession } from "next-auth/react";
import EditForm from "./EditForm";
import { useState } from "react";

const Container = ({ item, value, image }) => {
  return (
    <div className="w-full flex items-center justify-between min-h-[5.67rem] md:grid md:grid-cols-2  px-7 py-4">
      <p className="text-gray uppercase font-medium text-sm leading-normal -tracking-tight">
        {item}
      </p>

      {image ? (
        <img src={value} className="rounded-lg w-[4.5rem] aspect-square " />
      ) : (
        <p className="text-text font-medium leading-normal -tracking-[0.035rem] max-w-[12.5rem] md:max-w-full overflow-ellipsis whitespace-nowrap overflow-hidden">
          {value}
        </p>
      )}
    </div>
  );
};

const ProfileForms = () => {
  const [isEditable, setIsEditable] = useState(false);
  const { data: session } = useSession();

  return (
    <>
      {isEditable ? (
        <EditForm setFunc={setIsEditable} />
      ) : (
        <div className="w-full h-full flex flex-col items-start md:w-11/12 md:self-center md:border md:max-w-[52rem] md:border-solid md:border-divider md:rounded-xl md:pt-8 md:px-12 pb-8">
          <div className="w-full flex items-center justify-between px-6 mb-9 md:max-w-[90rem]">
            <div className="flex flex-col items-start">
              <p className="text-black text-2xl leading-normal mb-1  -tracking-wider">
                Profile
              </p>
              <p className="text-l-gray text-sm font-medium -tracking-tight ">
                Some info may be visible <br /> to other people
              </p>

              {/* <p className="text-black hidden md:block text-2xl leading-normal mb-1-tracking-wider">
              Change Info
            </p>
            <p className="text-l-gray hidden md:block text-sm font-medium -tracking-tight mb-6">
              Changes will be reflected to every services
            </p> */}
            </div>
            {/* for small devices  */}
            <button
              onClick={() => setIsEditable(!isEditable)}
              className="rounded-xl border border-solid border-light-gray-gray px-9 py-2 text-l-gray"
            >
              Edit
            </button>
          </div>

          {/* divider  */}
          <Divider />

          {/* for small devices */}
          <div className="flex flex-col items-start w-full">
            <Container
              item={"Photo"}
              image={true}
              value={session?.user.image}
            />
            <Divider />
            <Container item={"Name"} value={session?.user.name} />
            <Divider />
            <Container
              item={"bio"}
              value={
                "i am a software developer with background in css and some othr more just testing this string "
              }
            />
            <Divider />
            <Container item={"email"} value={session?.user.email} />
            <Divider />
            <Container item={"password"} value={"**********"} />
          </div>

          {/* for large devices  */}
        </div>
      )}
    </>
  );
};

export default ProfileForms;
