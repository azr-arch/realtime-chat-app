"use client";

export const initialState = {
    currentChat: "",
    loading: false,
    chatsLoading: false,
    messages: [],
    chats: [],
    contacts: [],
};

export function chatReducer(state, action) {
    switch (action.type) {
        case "SET_CURRENT_CHAT":
            return { ...state, currentChat: action.payload };

        case "SET_LOADING":
            return { ...state, loading: action.payload };

        case "SET_CHATS_LOADING":
            return { ...state, chatsLoading: action.payload };

        case "SET_MESSAGES":
            return { ...state, messages: action.payload };

        case "SET_CHATS":
            return { ...state, chats: action.payload };

        case "SET_CONTACTS":
            return { ...state, contacts: action.payload };

        default:
            throw new Error("No action of " + action.type);
    }
}
