import moment from "moment";
import { Badge } from "./badge";

const MessageWithDate = ({ msg, prevMsg, session }) => {
    const msgDate = moment(msg?.updatedAt);
    const prevMsgDate = prevMsg ? moment(prevMsg?.updatedAt) : null;
    const shouldDisplayDate = !prevMsgDate || !msgDate.isSame(prevMsgDate, "day");

    return (
        <>
            {shouldDisplayDate && (
                <Badge
                    variant="outline"
                    className="w-fit self-center rounded-md text-[10px] shadow-sm my-2 bg-black text-neutral-300"
                >
                    {msgDate.calendar(null, {
                        sameDay: "[Today]",
                        lastDay: "[Yesterday]",
                        lastWeek: "dddd",
                        sameElse: "L",
                    })}
                </Badge>
            )}

            {/* Your existing message rendering code here */}
            <div
                className={`flex flex-col items-start gap-1 ${
                    msg?.sender?._id?.toString() === session?.user?.sub
                        ? "self-start items-start"
                        : "self-end items-end"
                }`}
            >
                <div
                    data-sender={
                        msg?.sender?._id?.toString() === session?.user?.sub ? "self" : "other"
                    }
                    className={`w-fit ${
                        msg?.sender?._id?.toString() === session?.user?.sub
                            ? " text-black_accent_2 bg-on_white_gray_2 "
                            : "self-end items-end text-white bg-orange"
                    } flex flex-col text-sm font-medium  rounded-sm py-2 px-4`}
                >
                    <p>{msg?.content}</p>
                </div>

                <div className="flex items-center space-x-2 mt-[2px] text-[10px]">
                    <time className=" text-on_white_gray font-semibold ">
                        {moment(msg?.updatedAt).format("HH:mm A")}
                    </time>
                    <p>{msg?.status}</p>
                </div>
            </div>
        </>
    );
};

export default MessageWithDate;
