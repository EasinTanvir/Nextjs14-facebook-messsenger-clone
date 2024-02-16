"use server";
import { prisma } from "../prismaClient";
import { getServerCredentials } from "../actions/sersverSession";

import { revalidatePath } from "next/cache";
import { pusherServer } from "@/lib/pusher";

export const createFriendAction = async (formData: any) => {
  const session = await getServerCredentials();
  const userId = formData.get("userId");

  if (!session) {
    return {
      message: "Unauthorized access",
    };
  }
  const data = {
    userId: session.user.id,
    postId: "",
    name: session.user.name,
    image: session.user.image,
    message: "has accepted friend req",
  };

  try {
    let user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });
    let friendUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    const userAlreadyExit = user?.friends.some(
      (item) => item.friendId === userId
    );

    if (userAlreadyExit) {
      return {
        message: "You guyz already friends",
      };
    } else {
      const insertData: any = user?.friends.map((item) => item);
      const friendData: any = friendUser?.friends.map((item) => item);
      await prisma.user.update({
        where: { id: session.user.id },
        data: {
          friends: [
            ...insertData,
            { friendId: userId, userId: session.user.id },
          ],
        },
      });
      await prisma.user.update({
        where: { id: userId },
        data: {
          friends: [...friendData, { friendId: session.user.id, userId }],
        },
      });

      await prisma.conversations.create({
        data: {
          senderId: session.user.id,
          receiverId: userId,
        },
      });

      pusherServer.trigger(`${userId}`, "message", data);
      revalidatePath("/messenger");
    }
  } catch (err) {
    return {
      message: "SomeTHing went wrong",
    };
  }
};
