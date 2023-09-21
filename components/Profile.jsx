"use client";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import ProfileForms from "./profileForms/ProfileForms";
import { redirect } from "next/dist/server/api-utils";
import { useState } from "react";

const Profile = () => {
  const { data: session, status } = useSession();
  const [dropbar, setDropbar] = useState(true);

  if (status === "unauthenticated") {
    return redirect("/");
  }

  return (
    <section className="w-full min-h-screen flex flex-col items-start">
      <header className="self-stretch px-7 md:px-[4.6rem] py-[.92rem] md:py-7 relative">
        <div className="flex items-center ml-auto justify-end">
          <img
            src={session?.user.image}
            alt="profile-pic"
            className="w-8 h-9 rounded-md object-cover"
          />

          <p className="hidden md:block text-text text-xs font-bold leading-normal ml-[.69rem]">
            {session?.user.name}
          </p>
        </div>
        {dropbar && (
          <div
            onClick={() => setDropbar((prev) => !prev)}
            className="absolute top-full right-5 p-4 w-[11rem] rounded-xl border border-solid border-divider bg-white shadow-sm"
          ></div>
        )}
      </header>

      <section className="self-stretch flex flex-col items-start h-full py-8">
        <h2 className=" text-center w-full text-black text-2xl leading-normal -tracking-tighter mb-2">
          Personal info
        </h2>
        <p className=" text-center w-full text-black text-sm font-light leading-normal -tracking-[0.03rem] mb-10">
          Basic info, like your name and photo
        </p>

        <ProfileForms />
      </section>
    </section>
  );
};

export default Profile;
