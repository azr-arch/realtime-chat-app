import React, { useState } from "react";

const EditForm = ({ setFunc, currentUser }) => {
  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    password: "",
    bio: "",
  });

  return (
    <div className=" w-full h-full flex flex-col items-start px-7 md:w-11/12 md:self-center md:border md:max-w-[52rem] md:border-solid md:border-divider md:rounded-xl md:pt-8 md:px-12 py-[2.6rem]">
      <p className="text-black text-2xl leading-normal mb-1 flex items-center w-full justify-between  -tracking-wider">
        Change Info
        <button
          onClick={() => setFunc(false)}
          className="bg-red-600 text-white px-4 py-1 rounded-md text-lg"
        >
          Cancel
        </button>
      </p>
      <p className="text-l-gray text-sm font-medium -tracking-tight mb-[1.62rem]">
        Changes will be reflected to every services
      </p>

      <div className="flex items-center gap-7 mb-8">
        <div
          className="relative w-[4.5rem] aspect-square rounded-lg overflow-hidden"
          id="change-img"
        >
          <input type="file" hidden />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
            fill="white"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
          >
            <path d="M480-260q75 0 127.5-52.5T660-440q0-75-52.5-127.5T480-620q-75 0-127.5 52.5T300-440q0 75 52.5 127.5T480-260Zm0-80q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM160-120q-33 0-56.5-23.5T80-200v-480q0-33 23.5-56.5T160-760h126l74-80h240l74 80h126q33 0 56.5 23.5T880-680v480q0 33-23.5 56.5T800-120H160Zm0-80h640v-480H638l-73-80H395l-73 80H160v480Zm320-240Z" />
          </svg>

          <img
            src={currentUser?.image}
            alt="user-profile"
            className="w-full h-full "
          />
        </div>

        <p className="text-gray uppercase font-medium text-sm leading-normal -tracking-tight h-auto ">
          change photo
        </p>
      </div>

      <div className="w-full max-w-[26rem] flex flex-col items-start justify-between min-h-[5.67rem] gap-6 py-4">
        <div className="w-full flex flex-col items-start gap-1">
          <label
            htmlFor="name"
            className="text-label text-sm leading-normal -tracking-wide font-medium"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            placeholder={currentUser?.name}
            className="w-full rounded-xl border border-solid border-light-gray py-4 px-4"
          />
        </div>
        <div className="w-full flex flex-col items-start gap-1">
          <label
            htmlFor="Email"
            className="text-label text-sm leading-normal -tracking-wide font-medium"
          >
            Email
          </label>
          <input
            type="email"
            name="Email"
            placeholder={currentUser?.email}
            className="w-full rounded-xl border border-solid border-light-gray py-4 px-4"
          />
        </div>
        <div className="w-full flex flex-col items-start gap-1">
          <label
            htmlFor="bio"
            className="text-label text-sm leading-normal -tracking-wide font-medium"
          >
            Bio
          </label>
          <textarea
            name="bio"
            placeholder={currentUser?.bio}
            rows={3}
            className="w-full rounded-xl border border-solid border-light-gray py-4 px-4 resize-none text-ellipsis"
          />
        </div>
        <div className="w-full flex flex-col items-start gap-1">
          <label
            htmlFor="password"
            className="text-label text-sm leading-normal -tracking-wide font-medium"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder={"*".repeat(currentUser?.password.length)}
            className="w-full rounded-xl border border-solid border-light-gray py-4 px-4 text-ellipsis"
          />
        </div>
        <button className="px-6 py-2 rounded-lg bg-blue text-white ">
          Save
        </button>
      </div>
    </div>
  );
};

export default EditForm;
