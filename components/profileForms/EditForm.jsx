"use client";

import React, { useState } from "react";

const EditForm = ({ setFunc, currentUser }) => {
  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    password: "",
    bio: "",
    image: null,
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //if anything has been changed -> update the changes else return
    if (
      editFormData.name ||
      editFormData.email ||
      editFormData.password ||
      editFormData.bio ||
      editFormData.image
    ) {
      try {
        let imageUrl = await uploadImage();

        //add only changed data in object
        let profileData = {};
        for (let key in editFormData) {
          if (editFormData[key]) {
            profileData[key] = editFormData[key];
          }
        }

        //add image
        if (editFormData.image) {
          profileData["image"] = imageUrl;
        }

        setLoading(true);
        const res = await fetch(`/api/updateUserDetails/${currentUser._id}`, {
          method: "POST",
          body: JSON.stringify(profileData),
        });

        // const data = await res.json();
        window.location.reload();
        console.log("profile updated successfully");
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    return;
  };

  const uploadImage = async () => {
    if (editFormData.image) {
      const formData = new FormData();
      formData.append("file", editFormData.image);
      formData.append("upload_preset", "auth-uploads");
      try {
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await res.json();
        return data.secure_url;
      } catch (error) {
        throw new Error("error occured while uploading image");
      }
    }
    return null;
  };

  const handleImageUpdate = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setPreviewImage(reader.result);
      });
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className=" w-full h-full flex flex-col items-start px-7 md:w-11/12 md:self-center md:border md:max-w-[52rem] md:border-solid md:border-divider md:rounded-xl md:pt-8 md:px-12 py-[2.6rem]">
      <p className="text-dark text-2xl leading-normal mb-1 flex items-center w-full justify-between  -tracking-wider">
        Change Info
        <button
          onClick={() => setFunc(false)}
          className="bg-red-600 hover:opacity-70 text-white px-4 py-1 rounded-md text-lg"
        >
          Cancel
        </button>
      </p>
      <p className="text-l-gray text-sm font-medium -tracking-tight mb-[1.62rem]">
        Changes will be reflected to every services
      </p>

      <div className="flex items-center gap-7 mb-8">
        <label
          className="relative w-[4.5rem] aspect-square rounded-lg overflow-hidden"
          id="change-img"
          htmlFor="image-upload"
        >
          <input
            onChange={handleImageUpdate}
            type="file"
            name="image"
            hidden
            id="image-upload"
          />
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
            src={previewImage ? previewImage : currentUser?.image}
            alt="user-profile"
            className="w-full h-full object-contain"
          />
        </label>

        <p className="text-gray uppercase font-medium text-sm leading-normal -tracking-tight h-auto ">
          change photo
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[26rem] flex flex-col items-start justify-between min-h-[5.67rem] gap-6 py-4"
      >
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
            onChange={(e) =>
              setEditFormData((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
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
            onChange={(e) =>
              setEditFormData((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
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
            onChange={(e) =>
              setEditFormData((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
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
            placeholder={"*".repeat(8)}
            onChange={(e) =>
              setEditFormData((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
            className="w-full rounded-xl border border-solid border-light-gray py-4 px-4 text-ellipsis"
          />
        </div>
        <button
          disabled={loading}
          className={`hover:opacity-70  px-6 py-2 rounded-lg bg-blue text-white ${
            loading ? "opacity-50" : ""
          }`}
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
};

export default EditForm;
