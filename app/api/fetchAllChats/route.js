import Chat from "@models/chat";
import User from "@models/user";
import { attachUser } from "@middleware";
import { ApiResponse } from "@utils";
import { getServerSession } from "next-auth";

export async function GET(request) {
  try {
    const { user: session } = await getServerSession();

    // const chats = await Chat.find({
    //   participants: currUserId,
    // }).sort({ createdAt: -1 });

    const user = await User.findOne({ email: session.email }).select("_id ");

    const chats = await Chat.aggregate([
      {
        $match: {
          participants: { $elemMatch: { $eq: user._id } },
        },
      },
      {
        $sort: {
          updatedAt: -1,
        },
      },
      {
        // lookup for the participants present
        $lookup: {
          from: "users",
          foreignField: "_id",
          localField: "participants",
          as: "participants",
          pipeline: [
            {
              $project: {
                password: 0,
                contacts: 0,
                updatedAt: 0,
                createdAt: 0,
              },
            },
          ],
        },
      },
      {
        // lookup for the group chats
        $lookup: {
          from: "chatmessages",
          foreignField: "_id",
          localField: "lastMessage",
          as: "lastMessage",
          pipeline: [
            {
              // get details of the sender
              $lookup: {
                from: "users",
                foreignField: "_id",
                localField: "sender",
                as: "sender",
                pipeline: [
                  {
                    $project: {
                      name: 1,
                      avatar: 1,
                      email: 1,
                    },
                  },
                ],
              },
            },
            {
              $addFields: {
                sender: { $first: "$sender" },
              },
            },
          ],
        },
      },
      {
        $addFields: {
          lastMessage: { $first: "$lastMessage" },
        },
      },
    ]);

    return ApiResponse(chats, 200);
  } catch (error) {
    return ApiResponse("Somehitng went wrong", 500);
  }
}
