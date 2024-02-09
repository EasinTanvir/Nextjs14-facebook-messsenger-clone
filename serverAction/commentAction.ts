"use server";
import { prisma } from "../prismaClient";
import { getServerCredentials } from "../actions/sersverSession";

import { revalidatePath } from "next/cache";
import { pusherServer } from "@/lib/pusher";

export const createCommentAction = async (
  prevState: any,

  formData: any
) => {
  const comment = formData.get("comment");
  const postId = formData.get("positId");
  const userId = formData.get("userId");
  const session = await getServerCredentials();

  if (!session) {
    return {
      message: "Unauthorized access",
    };
  }
  if (!comment) {
    return {
      message: "Please type your comment",
    };
  }
  const data = {
    userId: session.user.id,
    postId,
    name: session.user.name,
    image: session.user.image,
    message: "comment on your post",
  };
  pusherServer.trigger(`${userId}`, "message", data);
  try {
    await prisma.comments.create({
      data: { comment: comment, postsId: postId, userId: session.user.id },
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
