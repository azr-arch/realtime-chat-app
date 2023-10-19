"use client";

import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useChat } from "@context/ChatContext";
import { redirect, useRouter } from "next/navigation";
import Image from "next/image";
import { Router } from "next/router";
import { useSocket } from "@context/SocketContext";
import ContactHeader from "./ContactHeader";
import ChatList from "./ChatList";

const Contacts = () => {
    const { status, data: session } = useSession();
    const router = useRouter();

    const [contacts, setContacts] = useState([]);
    const [addContactOpen, setAddContactOpen] = useState(false);
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(false);

    const { setCurrentChat } = useChat();
    const { socket } = useSocket();

    const getChats = async (receiverId) => {
        try {
            const res = await fetch("api/fetchAllChats");
            const { data } = await res.json();
            setChats((prev) => [...data]);
        } catch (error) {
            console.log(error);
        }
    };

    const handleAddContact = async (contactToAdd) => {
        if (!contactToAdd) return;

        // TODO: Check if contactToAdd is email or not
        if (contactToAdd === session.user.email) {
            return alert("you cant add your self");
        }

        try {
            const res = await fetch("api/addContact", {
                method: "POST",
                body: JSON.stringify({
                    currUser: session.user.email,
                    personToAdd: contactToAdd,
                }),
            });
            console.log(res);
        } catch (error) {
            console.log("error occured: ", error);
        }

        router.refresh();
    };

    const getChat = async (receiverId) => {
        try {
            const res = await fetch("api/getChat", {
                method: "POST",
                body: JSON.stringify({ currUserId: session.user.sub, receiverId }),
            });

            const { data } = await res.json(); // toDo store it in localstorage
            setCurrentChat(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        setLoading(true);
        // if (session?.user?.email) {
        const fetchContacts = async () => {
            const res = await fetch("api/fetchContacts");

            if (!res.ok) {
                // console.log("error occurred ", res);
                return;
            }
            const { data } = await res.json();
            setContacts([...data.contacts]);
        };
        fetchContacts();
        getChats();

        setLoading(false);
        // }
    }, []);

    function getReceiver(item) {
        const receiver = item.filter((itm) => itm.email !== session.user.email);
        return receiver[0];
    }

    if (status === "loading") return <p>Loading...</p>;
    if (status === "unauthenticated") return redirect("/");
    return (
        <div className="flex flex-col items-start gap-2 self-stretch w-full">
            {loading && <p>Loading...</p>}
            <ContactHeader handleAddContact={handleAddContact} />

            {
                // Individual Contacts
                //       contacts?.map((contact, idx) => {
                //           return (
                //               <div
                //                   key={idx}
                //                   className="flex items-center gap-3 py-3 px-5 relative cursor-pointer bg-slate-100 rounded-md"
                //                   onClick={() => {
                //                       getChat(contact._id);
                //                   }}
                //               >
                //                   <img
                //                       src={contact?.avatar}
                //                       alt="user-profile"
                //                       className="object-cover w-[40px] h-[40px] rounded-full "
                //                   />
                //                   <div className="text-black flex flex-col justify-start">
                //                       <p className="font-medium text-sm">{contact?.name}</p>
                //                       {/* <p className="text-xs text-gray-500 text-ellipsis"> {lastMessage}</p> */}
                //                   </div>
                //                   {/* <time className="text-[10px] leading-normal text-gray-500 absolute top-2 right-4">
                //   {date}
                //  </time> */}
                //               </div>
                //           );
                //       })
            }

            {/* Add Contact   */}
            {/* <button onClick={(e) => document.getElementById("dialog").showModal()}>
                    Add Contact
                </button> */}
            {/* <dialog
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
                </dialog> */}
            <ChatList chats={chats} session={session} />
        </div>
    );
};

export default Contacts;
