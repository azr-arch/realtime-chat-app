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

        case "UPDATE_SEEN":
            return {
                ...state,
                messages: state.messages.map((msg) => {
                    if (msg._id === action.payload._id) {
                        return { ...msg, status: "seen" };
                    }
                    return msg;
                }),
            };

        default:
            throw new Error("No action of " + action.type);
    }
}
