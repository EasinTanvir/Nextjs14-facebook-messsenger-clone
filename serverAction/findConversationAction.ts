"use server";
import { prisma } from "../prismaClient";
import { getServerCredentials } from "../actions/sersverSession";

import { revalidatePath } from "next/cache";

export const findAllMessageAction = async ({ converId }: any) => {
  const session = await getServerCredentials();

  if (!session) {
    return {
      error: "Unauthorized access",
    };
  }
  try {
    let message = await prisma.message.findMany({
      where: {
        conversationId: converId,
      },
      include: {
        sender: true,
        receiver: true,
      },
    });
    let conversation = await prisma.conversations.findUnique({
      where: {
        id: converId,
      },
      include: {
        sender: { select: { id: true, userName: true, image: true } },
        receiver: { select: { id: true, userName: true, image: true } },
      },
    });

    return { message, conversation };
  } catch (err) {
    return {
      error: "SomeTHing went wrong",
    };
  }
};
