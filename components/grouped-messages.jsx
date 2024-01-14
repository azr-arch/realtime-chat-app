import moment from "moment";
import { MessageItem } from "./ui/message-item";
import { cn } from "@lib/utils";
import Image from "next/image";

export const GroupedMessages = ({ messages, session }) => {
    let groupedMessages = [];
    let currentGroup = [];
    let currentDate = null;

    if (messages.length <= 0) {
        return null;
    }

    for (let i = 0; i < messages.length; i++) {
        const msg = messages[i];
        const prevMsg = messages[i - 1];

        // If the previous message exists and is from the same sender and the same day, add the message to the current group
        if (
            prevMsg &&
            prevMsg.sender._id === msg.sender._id &&
            moment(prevMsg.updatedAt).isSame(msg.updatedAt, "day")
        ) {
            currentGroup.push(msg);
        } else {
            // If the current group is not empty, add it to the grouped messages
            if (currentGroup.length > 0) {
                groupedMessages.push(currentGroup);
            }

            // Start a new group with the current message
            currentGroup = [msg];
        }

        // Check if the date has changed
        if (!currentDate || !moment(msg.updatedAt).isSame(currentDate, "day")) {
            currentDate = moment(msg.updatedAt);
            msg.isNewDay = true;
        }
    }

    // Add the last group if it's not empty
    if (currentGroup.length > 0) {
        groupedMessages.push(currentGroup);
    }

    return (
        <>
            {groupedMessages.map((group, idx) => {
                const isReceiver = session?.user?.sub !== group[0].sender._id;
                const receiverData = group[0].sender;

                return (
                    <div
                        key={idx}
                        data-label="chat-messages"
                        className={cn("flex flex-col w-full gap-3 relative", {
                            "pl-11": isReceiver,
                        })}
                    >
                        {group.map((msg, idx) => (
                            <MessageItem key={msg._id | idx} msg={msg} session={session} />
                        ))}

                        {/* Add the profile icon */}
                        {isReceiver && (
                            <div className="absolute w-8 h-8 bottom-5 left-0 shadow-sm transition-all duration-150 animate-in">
                                <Image
                                    fill
                                    src={receiverData?.avatar}
                                    alt="user-profile"
                                    className="object-cover rounded-full"
                                />
                            </div>
                        )}
                    </div>
                );
            })}
        </>
    );
};
