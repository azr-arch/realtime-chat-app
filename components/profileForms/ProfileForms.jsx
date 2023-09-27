"use client";

import Divider from "@components/Divider";
import EditForm from "./EditForm";
import { useState } from "react";

const Container = ({ item, value, image }) => {
  return (
    <div className="w-full flex items-center justify-between min-h-[5.67rem] md:grid md:grid-cols-2  px-7 py-4">
      <p className="text-gray uppercase font-medium text-sm leading-normal -tracking-tight">
        {item}
      </p>

      {image ? (
        <img
          src={value}
          className="rounded-lg w-[4.5rem] aspect-square object-contain "
        />
      ) : (
        <p className="text-text font-medium leading-normal -tracking-[0.035rem] max-w-[12.5rem] md:max-w-full overflow-ellipsis whitespace-nowrap overflow-hidden">
          {value}
        </p>
      )}
    </div>
  );
};

const ProfileForms = ({ currentUser }) => {
  const [isEditable, setIsEditable] = useState(false);
  return (
    <>
      {isEditable ? (
        <EditForm setFunc={setIsEditable} currentUser={currentUser} />
      ) : (
        <div className="w-full h-full flex flex-col items-start md:w-11/12 md:self-center md:border md:max-w-[52rem] md:border-solid md:border-divider md:rounded-xl md:pt-8 md:px-12 pb-8">
          <div className="w-full flex items-center justify-between px-6 mb-9 md:max-w-[90rem]">
            <div className="flex flex-col items-start">
              <p className="text-dark text-2xl leading-normal mb-1  -tracking-wider">
                Profile
              </p>
              <p className="text-l-gray text-sm font-medium -tracking-tight ">
                Some info may be visible <br /> to other people
              </p>

              {/* <p className="text-dark hidden md:block text-2xl leading-normal mb-1-tracking-wider">
              Change Info
            </p>
            <p className="text-l-gray hidden md:block text-sm font-medium -tracking-tight mb-6">
              Changes will be reflected to every services
            </p> */}
            </div>
            {/* for small devices  */}
            <button
              onClick={() => setIsEditable(!isEditable)}
              className="rounded-xl border border-solid border-light-gray-gray px-9 py-2 text-l-gray hover:bg-opposite"
            >
              Edit
            </button>
          </div>

          {/* divider  */}
          <Divider />

          {/* for small devices */}
          <div className="flex flex-col items-start w-full">
            <Container item={"Photo"} image={true} value={currentUser?.image} />
            <Divider />
            <Container item={"Name"} value={currentUser?.name} />
            <Divider />
            <Container item={"bio"} value={currentUser?.bio} />
            <Divider />
            <Container item={"email"} value={currentUser?.email} />
            <Divider />
            <Container
              item={"password"}
              value={"*".repeat(currentUser?.password.length)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileForms;
