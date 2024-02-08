"use server";
import { prisma } from "../prismaClient";
import { getServerCredentials } from "../actions/sersverSession";

import { revalidatePath } from "next/cache";

export const createCommentAction = async (
  prevState: any,

  formData: any
) => {
  const comment = formData.get("comment");
  const postId = formData.get("positId");
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
