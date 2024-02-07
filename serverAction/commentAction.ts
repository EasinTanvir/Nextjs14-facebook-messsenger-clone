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

  try {
    await prisma.comments.create({
      data: { comment: comment, postsId: postId, userId: session.user.id },
    });

    revalidatePath("/");
    return {
      message: "Success",
    };
  } catch (err) {
    return {
      message: "Create comment failed",
    };
  }
};
