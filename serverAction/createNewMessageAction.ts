"use server";
import { prisma } from "../prismaClient";
import { getServerCredentials } from "../actions/sersverSession";

import { revalidatePath } from "next/cache";
import { pusherServer } from "@/lib/pusher";

export const createNewMessageAction = async (data: any) => {
  const session = await getServerCredentials();

  if (!session) {
    return {
      error: "Unauthorized access",
    };
  }
  try {
    await pusherServer.trigger(`${data.conversationId}`, "messenger", data);
    await pusherServer.trigger(`${data.receiverId}`, "notify", data);

    await prisma.message.create({ data: data });
    //revalidatePath("/messenger");
  } catch (err) {
    return {
      error: "SomeTHing went wrong",
    };
  }
};
