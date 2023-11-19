"use client";

import React, { useCallback, useEffect, useRef } from "react";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "./context-menu";

const ContextMenuWrapper = ({ children, src }) => {
    const downloadFileAtUrl = useCallback((url) => {
        fetch(url, {
            method: "GET",
            headers: {},
        })
            .then((response) => {
                response.arrayBuffer().then(function (buffer) {
                    const url = window.URL.createObjectURL(new Blob([buffer]));
                    const link = document.createElement("a");
                    link.href = url;
                    link.download = "image.png";
                    link.click();
                    link.remove();
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <ContextMenu>
            <ContextMenuTrigger>{children}</ContextMenuTrigger>
            <ContextMenuContent>
                <ContextMenuItem>
                    <button onClick={() => downloadFileAtUrl(src)}>Download</button>
                </ContextMenuItem>
                <ContextMenuItem>Properties</ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    );
};

export default ContextMenuWrapper;
