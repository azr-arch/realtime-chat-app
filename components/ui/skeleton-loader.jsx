"use client";

import React from "react";
import { Skeleton } from "./skeleton";
import { cn } from "@lib/utils";

export function ChatsContactsSkeleton({ className, count }) {
    return (
        <>
            {Array.from({ length: count }).map((_, idx) => (
                <div
                    key={idx}
                    className={cn(
                        "w-full flex grow justify-center min-h-[65px] gap-3 py-3 px-6",
                        className
                    )}
                >
                    <Skeleton className="h-11 w-11 aspect-square rounded-full" />
                    <div className="space-y-2 grow w-full self-stretch">
                        <Skeleton className="h-4" />
                        <Skeleton className="h-4 w-[50%]" />
                    </div>
                </div>
            ))}
        </>
    );
}
