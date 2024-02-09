import { prisma } from "../prismaClient";
import { getServerCredentials } from "./sersverSession";

export const fetchPost = async () => {
  try {
    const posts = await prisma.posts.findMany({
      where: { mode: "PUBLIC" },
      include: {
        user: true,
        like: true,
        comment: {
          include: { User: true, reply: { include: { user: true } } },
          orderBy: { createAt: "desc" },
        },
      },
      orderBy: { time: "desc" },
    });

    return posts;
  } catch (err) {
    return { message: "Something went wrong!" };
  }
};
export const fetchMyPost = async (id: string) => {
  const session = await getServerCredentials();

  let posts;

  try {
    if (session) {
      posts = await prisma.posts.findMany({
        where: { userId: id },
        include: {
          user: true,
          like: true,
          comment: {
            include: { User: true, reply: { include: { user: true } } },
            orderBy: { createAt: "desc" },
          },
        },
        orderBy: { time: "desc" },
      });
    } else {
      posts = await prisma.posts.findMany({
        where: { userId: id, mode: "PRIVATE" },
        include: {
          user: true,
          like: true,
          comment: {
            include: { User: true, reply: { include: { user: true } } },
            orderBy: { createAt: "desc" },
          },
        },
        orderBy: { time: "desc" },
      });
    }
    return posts;
  } catch (err) {
    return { message: "Something went wrong!" };
  }
};

export const fetchUser = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  } catch (err) {
    return { message: "Something went wrong!" };
  }
};
export const fetchPostbyId = async (id: string) => {
  try {
    const post = await prisma.posts.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
        like: true,
        comment: {
          include: { User: true, reply: { include: { user: true } } },
          orderBy: { createAt: "desc" },
        },
      },
    });

    return post;
  } catch (err) {
    return { message: "Something went wrong!" };
  }
};
