"use server";
import { prisma } from "../prismaClient";
import { getServerCredentials } from "../actions/sersverSession";
import firebaseUploadHandler from "@/utils/firebaseUploadHandler";
import { revalidatePath } from "next/cache";

export const createPostAction = async (extra: any, formData: any) => {
  const session = await getServerCredentials();

  if (!session) {
    return {
      message: "Unauthorized access",
    };
  }
  const sendData = {
    caption: formData.get("caption") || "",
    image: formData.get("postimage") || "",
    mode: formData.get("mode") || "",
  };

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
    return {
      message: "Success",
    };
  } catch (err) {
    return {
      message: "Something went wrong!",
    };
  }
};
