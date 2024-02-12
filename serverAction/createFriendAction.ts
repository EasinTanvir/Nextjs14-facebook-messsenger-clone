"use server";
import { prisma } from "../prismaClient";
import { getServerCredentials } from "../actions/sersverSession";

import { revalidatePath } from "next/cache";
import { pusherServer } from "@/lib/pusher";

export const createFriendAction = async (
  prevData: any,

  formData: any
) => {
  const session = await getServerCredentials();
  const userId = formData.get("userId");

  if (!session) {
    return {
      message: "Unauthorized access",
    };
  }

  try {
    let user = await prisma.user.findUnique({
      where: { id: session.user.id },
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
          friends: [{ friendId: session.user.id, userId }],
        },
      });

      return {
        message: "Create friend Successfull",
      };
    }
  } catch (err) {
    return {
      message: "Create comment failed",
    };
  }
};
