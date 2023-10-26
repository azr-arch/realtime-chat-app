export { default } from "next-auth/middleware";
import { getSession } from "next-auth/react";

export const config = { matcher: ["/chat", "/chat/profile"] };

export const attachUser = async (req, next) => {
    const session = await getSession({ req });
    if (session) {
        req.user = session.user;
    }
    next();
};
