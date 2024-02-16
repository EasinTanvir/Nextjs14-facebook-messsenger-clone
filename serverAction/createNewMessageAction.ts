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
    pusherServer.trigger(`${data.receiverId}`, "messenger", data);
    await prisma.message.create({ data: data });
  } catch (err) {
    return {
      error: "SomeTHing went wrong",
    };
  }
};
