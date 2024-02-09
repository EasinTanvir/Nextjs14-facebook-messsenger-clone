"use server";
import { prisma } from "../prismaClient";
import { getServerCredentials } from "../actions/sersverSession";

import { revalidatePath } from "next/cache";
import { pusherServer } from "@/lib/pusher";

export const createLikeAction = async (
  prevState: any,

  formData: any
) => {
  const session = await getServerCredentials();
  const postId = formData.get("postId");
  const userId = formData.get("userId");

  if (!session) {
    return {
      message: "Unauthorized access",
    };
  }
  const data = {
    userId: session.user.id,
    postId,
    name: session.user.name,
    image: session.user.image,
    message: "liked your post",
  };
  console.log(userId);

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
        message: "you dislike this post",
      };
    } else {
      pusherServer.trigger(`${userId}`, "message", data);
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
      revalidatePath("/");
      return {
        message: "you like this post",
      };
    }
  } catch (err) {
    return {
      message: "Something went wrong!",
    };
  }
};
