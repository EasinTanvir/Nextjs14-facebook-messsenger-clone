"use server";
import { prisma } from "../prismaClient";
import { getServerCredentials } from "../actions/sersverSession";

import { revalidatePath } from "next/cache";
import { pusherServer } from "@/lib/pusher";

export const createReplyAction = async (
  prevState: any,

  formData: any
) => {
  const text = formData.get("text");
  const commentId = formData.get("commentId");
  const userId = formData.get("userId");
  const postId = formData.get("postId");
  const session = await getServerCredentials();

  if (!session) {
    return {
      message: "Unauthorized access",
    };
  }
  if (!text) {
    return {
      message: "Please type your comment",
    };
  }

  try {
    await prisma.reply.create({
      data: { text, userId: session.user.id, commentId },
    });

    revalidatePath("/");
    return {
      message: "Comment added successful",
    };
  } catch (err) {
    return {
      message: "Create comment failed",
    };
  }
};
