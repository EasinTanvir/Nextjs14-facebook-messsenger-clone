import { notFound, redirect } from "next/navigation";
import { prisma } from "../prismaClient";
import { getServerCredentials } from "./sersverSession";

export const fetchConversation = async () => {
  const session = await getServerCredentials();
  if (session) {
    try {
      const conversation = await prisma.conversations.findMany({
        where: {
          OR: [
            { senderId: session?.user.id },
            { receiverId: session?.user.id },
          ],
        },
        include: {
          sender: true,
          receiver: true,
          Message: true,
        },
      });

      return conversation;
    } catch (err) {
      throw new Error("Something went wrong! Fetch posts failed");
    }
  } else {
    throw new Error("Unauthorized");
  }
};
