import { prisma } from "../prismaClient";
import { getServerCredentials } from "./sersverSession";

export const fetchPost = async () => {
  try {
    const posts = await prisma.posts.findMany({
      include: {
        user: true,
      },
    });

    return posts;
  } catch (err) {
    return { message: "Something went wrong!" };
  }
};
export const fetchMyPost = async () => {
  const session = await getServerCredentials();

  try {
    const posts = await prisma.posts.findMany({
      where: {
        userId: session?.user.id,
      },
    });

    return posts;
  } catch (err) {
    return { message: "Something went wrong!" };
  }
};
