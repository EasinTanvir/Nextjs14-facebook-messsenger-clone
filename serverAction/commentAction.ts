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

  if (userId !== session.user.id) {
    pusherServer.trigger(`${userId}`, "message", data);
  }

  try {
    let userC = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    const exUser: any = userC?.notification.map((item) => item);

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        notification: [...exUser, data],
      },
    });

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
