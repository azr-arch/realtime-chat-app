"use client";
import { signOut } from "next-auth/react";
import ProfileForms from "./profileForms/ProfileForms";
import { useState, useEffect } from "react";
import { useGlobal } from "@context/GlobalContext";
import Divider from "./Divider";

const Profile = ({ session }) => {
  const [dropbar, setDropbar] = useState(false);

  const { currentUser, setCurrentUser } = useGlobal();

  useEffect(() => {
    const fetchUser = async () => {
      if (session) {
        const email = `${session.user.email}`;
        const res = await fetch("/api/fetchCurrentUser", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(email),
        });

        const { user } = await res.json();
        setCurrentUser(user);
      }
    };

    fetchUser();
  }, []);

  return (
    <section className="w-full min-h-screen flex flex-col items-start">
      <header className="self-stretch px-7 md:px-[4.6rem] py-[.92rem] md:py-7 relative select-none">
        <div
          className="flex items-center ml-auto justify-end cursor-pointer"
          onClick={() => setDropbar(!dropbar)}
        >
          <img
            src={currentUser?.image}
            alt="profile-pic"
            className="w-8 h-9 rounded-md object-contain"
          />

          <p className="hidden md:block text-text text-xs font-bold leading-normal ml-[.69rem]">
            {currentUser?.name}
          </p>
        </div>
        {dropbar && (
          <div
            onClick={() => setDropbar((prev) => !prev)}
            className="absolute top-full right-5 px-3 py-4 w-[11rem] rounded-xl border border-solid border-divider bg-white shadow-primary"
          >
            <div className="flex items-center py-[0.6rem] pl-[0.3rem] gap-2 cursor-pointer bg-hover hover:bg-hover rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                viewBox="0 -960 960 960"
                width="20"
                fill="#4F4F4F"
              >
                <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z" />
              </svg>

              <p className="dropbar-text ">My Profile</p>
            </div>
            <Divider />
            <div
              className="flex items-center py-[.6rem] pl-[.3rem] gap-2 cursor-pointer hover:bg-hover rounded-lg"
              onClick={signOut}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                viewBox="0 -960 960 960"
                width="20"
                fill="#EB5757"
              >
                <path d="M200-120q-33 0-56.5-23.5T120-200v-160h80v160h560v-560H200v160h-80v-160q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm220-160-56-58 102-102H120v-80h346L364-622l56-58 200 200-200 200Z" />
              </svg>

              <p className="dropbar-red-text ">Logout</p>
            </div>
          </div>
        )}
      </header>

      <section className="self-stretch flex flex-col items-start h-full py-8">
        <h2 className=" text-center w-full text-black text-2xl leading-normal -tracking-tighter mb-2">
          Personal info
        </h2>
        <p className=" text-center w-full text-black text-sm font-light leading-normal -tracking-[0.03rem] mb-10">
          Basic info, like your name and photo
        </p>

        <ProfileForms currentUser={currentUser} />
      </section>
    </section>
  );
};

export default Profile;
