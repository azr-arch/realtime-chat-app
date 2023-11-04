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
                    className="w-fit self-center rounded-2xl text-[10px] text-accent_1 font-medium px-3 outline-on_white_gray_2 outline outline-[1px] py-2 my-2"
                >
                    {msgDate.calendar(null, {
                        sameDay: "[Today]",
                        lastDay: "[Yesterday]",
                        lastWeek: "dddd",
                        sameElse: "D MMMM, YYYY",
                    })}
                </Badge>
            )}

            {/* Message */}
            <div
                className={`flex flex-col items-start w-11/12 gap-1 relative ${
                    msg?.sender?._id?.toString() === session?.user?.sub
                        ? "self-end items-end"
                        : "self-start items-start"
                }`}
            >
                <div
                    data-sender={
                        msg?.sender?._id?.toString() === session?.user?.sub ? "self" : "other"
                    }
                    className={`w-fit ${
                        msg?.sender?._id?.toString() === session?.user?.sub
                            ? "text-white bg-orange   "
                            : "self-start items-start  text-message bg-on_white_gray_2"
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

                <img />
            </div>
        </>
    );
};

export default MessageWithDate;
