import moment from "moment";
import { Badge } from "./ui/badge";

export const DateBadge = ({ time }) => {
    if (!time) {
        return null;
    }

    return (
        <Badge
            variant="default"
            className="w-fit self-center rounded-2xl text-[10px] text-accent_1 font-medium px-3 outline-[#2a2b2d] outline  outline-[1px] py-2 my-2"
        >
            {moment(time).calendar(null, {
                sameDay: "[Today]",
                lastDay: "[Yesterday]",
                lastWeek: "dddd",
                sameElse: "D MMMM, YYYY",
            })}
        </Badge>
    );
};
