"use server";
import { prisma } from "../prismaClient";
import { getServerCredentials } from "../actions/sersverSession";
import { revalidatePath } from "next/cache";
import { pusherServer } from "@/lib/pusher";

export const reqForFriendAction = async (formData: any) => {
  const session = await getServerCredentials();
  const userId = formData.get("userId");
  console.log("userId ", userId);
  if (!session) {
    return {
      error: "Unauthorized access",
    };
  }

  const data = {
    userId: session.user.id,
    postId: "",
    name: session.user.name,
    image: session.user.image,
    message: "has sent you a friend req",
  };
  try {
    let userC = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    const exUser: any = userC?.notification.map((item) => item);

    const t = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        notification: [...exUser, data],
      },
    });
    console.log(t);

    pusherServer.trigger(`${userId}`, "message", data);

    revalidatePath("/");
  } catch (err) {
    return {
      error: "Send Notification failed",
    };
  }
};
