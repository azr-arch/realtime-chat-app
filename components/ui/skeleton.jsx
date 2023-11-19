import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }) {
    return (
        <div className={cn("animate-pulse rounded-md bg-on_white_gray", className)} {...props} />
    );
}

export { Skeleton };
