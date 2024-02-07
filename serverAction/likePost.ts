"use server";
import { prisma } from "../prismaClient";
import { getServerCredentials } from "../actions/sersverSession";

import { revalidatePath } from "next/cache";

export const createLikeAction = async (
  prevState: any,

  formData: any
) => {
  const session = await getServerCredentials();
  const postId = formData.get("postId");

  if (!session) {
    return {
      message: "Unauthorized access",
    };
  }
  try {
    const post = await prisma.posts.findUnique({
      where: { id: postId },
    });
    const alreadyLikedPost = post?.likeUser.some(
      (item) => item.userId === session.user.id
    );

    if (alreadyLikedPost) {
      const updatePost = post?.likeUser.filter(
        (item) => item.userId !== session.user.id
      );
      const postData = post?.likeUser.find(
        (item) => item.userId === session.user.id
      );

      await prisma.posts.update({
        where: {
          id: postId,
        },
        data: {
          likeUser: updatePost,
        },
      });

      await prisma.like.delete({ where: { id: postData?.likeId! } });
      revalidatePath("/");
      return {
        message: "Success",
      };
    } else {
      const res = await prisma.like.create({
        data: {
          postsId: postId,
          userId: session.user.id,
        },
      });

      await prisma.posts.update({
        where: {
          id: postId,
        },
        data: {
          likeUser: { set: [{ userId: session.user.id, likeId: res.id }] },
        },
      });
    }

    revalidatePath("/");
    return {
      message: "Success",
    };
  } catch (err) {
    return {
      message: "Something went wrong!",
    };
  }
};
