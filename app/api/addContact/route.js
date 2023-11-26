import User from "@models/user";
import { connectToDB } from "@lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request) {
    const { user } = await getServerSession();

    try {
        const { currUser, personToAdd } = await request.json();
        await connectToDB();

        if (String(personToAdd) === String(user.email)) {
            return NextResponse.json({ error: "You cant add yourself" }, { status: 400 });
        }

        const newContact = await User.findOne({ email: personToAdd }).select(
            " _id email name avatar"
        );

        if (!newContact) {
            return NextResponse.json({ error: "The user doesnt exists" }, { status: 500 });
        }

        // Update the currUser Contact document
        await addToContactList(currUser, newContact);

        return NextResponse.json({ data: newContact }, { status: 200 });
    } catch (error) {
        console.log("[ADD_CONTACT]", error);
        return NextResponse.json({ error: "An error occurred." }, { status: 500 });
    }
}

async function addToContactList(currUser, data) {
    try {
        // Check if contact already exists
        const user = await User.findOne({ email: currUser });
        const contactExists = user.contacts.some((contact) => contact.email === data.email);

        if (contactExists) {
            throw new Error("contact already exists");
        }

        // Add data in contacts array of user document
        await User.findOneAndUpdate({ email: currUser }, { $push: { contacts: data } });
    } catch (error) {
        console.log("Error while updating contact list ", error.message);
        throw new Error(error);
    }
}
