"use server";
import { prisma } from "../prismaClient";
import { getServerCredentials } from "../actions/sersverSession";

import { revalidatePath } from "next/cache";

export const createPostAction = async (formData: any) => {
  const session = await getServerCredentials();

  if (!session) {
    return {
      error: "Unauthorized access",
    };
  }
  const sendData = {
    caption: formData.get("caption") || "",
    image: formData.get("postimage") || "",
    mode: formData.get("mode") || "",
  };
  if (!sendData.caption && !sendData.image) {
    return {
      error: "Please write a caption or upload an image",
    };
  }
  try {
    await prisma.posts.create({
      data: {
        userId: session?.user.id!,
        caption: sendData.caption,
        image: sendData.image,
        mode: sendData.mode,
      },
    });
    revalidatePath("/");
  } catch (err) {
    return {
      error: "Something went wrong!",
    };
  }
};
