"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useChat } from "@context/ChatContext";

const Contacts = () => {
  const { status, data: session } = useSession();

  const [contacts, setContacts] = useState([]);
  const [addContactOpen, setAddContactOpen] = useState(false);
  const [addContactInfo, setAddContactInfo] = useState("");
  const [chats, setChats] = useState([]);

  const { setCurrentChat } = useChat();

  const getChats = async (receiverId) => {
    try {
      const res = await fetch("api/fetchAllChats", {
        method: "POST",
        body: JSON.stringify({ currUserId: session.user.sub }),
      });
      const { data } = await res.json();
      setChats((prev) => [...prev, ...data]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (session?.user?.email) {
      const fetchData = async () => {
        const res = await fetch("/api/fetchContacts", {
          method: "POST",
          body: JSON.stringify(session.user.email),
        });

        if (!res.ok) {
          console.log("error occurred ", res);
          return;
        }
        const { data } = await res.json();
        setContacts((prev) => [...prev, ...data.contacts]);
      };
      fetchData();
      getChats();
    }
  }, [session?.user?.email]);

  const handleAddContact = async () => {
    if (!addContactInfo) return;
    if (addContactInfo === session.user.email) {
      return alert("you cant add your self");
    }

    try {
      const res = await fetch("api/addContact", {
        method: "POST",
        body: JSON.stringify({
          currUser: session.user.email,
          personToAdd: addContactInfo,
        }),
      });

      console.log(res);
    } catch (error) {
      console.log("error occured: ", error);
    }
    setAddContactInfo("");
  };

  const getChat = async (receiverId) => {
    try {
      const res = await fetch("api/getChat", {
        method: "POST",
        body: JSON.stringify({ currUserId: session.user.sub, receiverId }),
      });

      const { data } = await res.json(); // toDo store it in localstorage
      setCurrentChat(data._id);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(chats);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "unauthenticated") return alert("please login");
  return (
    <>
      <div className="relative w-full max-w-md flex flex-col justify-start gap-2 p-5 bg-white text-black">
        Contacts:
        {
          // Individual Contacts
          contacts?.map((contact, idx) => {
            return (
              <div
                key={idx}
                className="flex items-center gap-3 py-3 px-5 relative cursor-pointer bg-slate-100 rounded-md"
                onClick={() => {
                  getChat(contact._id);
                }}
              >
                <img
                  src={contact?.avatar}
                  alt="user-profile"
                  className="object-cover w-[40px] h-[40px] rounded-full "
                />
                <div className="text-black flex flex-col justify-start">
                  <p className="font-medium text-sm">{contact?.name}</p>
                  {/* <p className="text-xs text-gray-500 text-ellipsis"> {lastMessage}</p> */}
                </div>

                {/* <time className="text-[10px] leading-normal text-gray-500 absolute top-2 right-4">
                {date}
               </time> */}
              </div>
            );
          })
        }
        {/* Add Contact   */}
        <button onClick={(e) => document.getElementById("dialog").showModal()}>
          Add Contact
        </button>
        <dialog
          className="backdrop:bg-black backdrop:bg-opacity-50 p-4 rounded-sm shadow-md"
          id="dialog"
        >
          <input
            type="text"
            placeholder="enter the person's email"
            className="px-4 py-1 mr-4 text-black"
            value={addContactInfo}
            onChange={(e) => setAddContactInfo(e.target.value)}
          />
          <button
            onClick={(e) => {
              document.getElementById("dialog").close();
              handleAddContact();
            }}
            autoFocus
          >
            Submit
          </button>
        </dialog>
        <div className="flex flex-col justify-start">
          {chats.length > 0 ? (
            chats.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 py-3 px-5 relative cursor-pointer bg-slate-100 rounded-md"
                onClick={() => setCurrentChat(item._id)}
              >
                {item._id}
              </div>
            ))
          ) : (
            <p className="text-black">no chat</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Contacts;
