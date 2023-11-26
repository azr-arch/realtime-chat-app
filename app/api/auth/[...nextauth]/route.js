import NextAuth from "next-auth/next";

import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import TwitterProvider from "next-auth/providers/twitter";
import CredentialsProvider from "next-auth/providers/credentials";

import { connectToDB } from "@lib/db";

import User from "@models/user";
import { signOut } from "next-auth/react";

import bcrypt from "bcrypt";

export const dynamic = "force-dynamic";
const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},

            async authorize(credentials) {
                const { email, password } = credentials;
                // console.log(email, password);
                try {
                    await connectToDB();
                    const user = await User.findOne({ email });
                    if (!user) return null;

                    const passwordsMatch = await bcrypt.compare(password, user.password);

                    // console.log(passwordsMatch);
                    if (!passwordsMatch) return null;

                    return user;
                } catch (error) {
                    console.log("error from authorize", error);
                }
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_ID,
            clientSecret: process.env.FACEBOOK_SECRET,
        }),
        TwitterProvider({
            clientId: process.env.TWITTER_ID,
            clientSecret: process.env.TWITTER_SECRET,
        }),
    ],

    pages: {
        signIn: "/",
    },
    callbacks: {
        async session({ session }) {
            // store the user id from MongoDB to session
            try {
                if (session.user) {
                    const sessionUser = await User.findOne({ email: session.user.email });
                    if (sessionUser) {
                        session.user.sub = sessionUser._id.toString();
                    }
                }
                return session;
            } catch (e) {
                console.log("an errro occrued in session ", e);
                throw new Error(e.message);
            }
        },
        async signIn({ profile, user, account }) {
            if (
                account.provider === "github" ||
                account.provider === "google" ||
                account.provider === "facebook" ||
                account.provider === "twitter"
            ) {
                try {
                    await connectToDB();
                    const email = profile.email;

                    // check if user already exists
                    const userExists = await User.findOne({ email });

                    // if not, create a new document and save user in MongoDB
                    if (!userExists) {
                        const hashedPassword = bcrypt.hash(profile.email.split("@")[0], 10);

                        await User.create({
                            email: profile.email,
                            name: profile.name,
                            image: profile.image,
                            password: hashedPassword,
                        });
                    }

                    return userExists._id;
                } catch (error) {
                    console.error("Error checking if user exists: ", error.message);
                }
            }
            return true;
        },
    },

    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
