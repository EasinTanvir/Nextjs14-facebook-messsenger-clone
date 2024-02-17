import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prismaClient";
import { getServerCredentials } from "../../../../../actions/sersverSession";
interface Props {
  params: { uid: string };
}
export async function GET(req: NextRequest, { params: { uid } }: Props) {
  const session = await getServerCredentials();
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: uid,
      },
    });

    const alreadyExist = user?.friends.some((item) =>
      uid === session?.user.id ? item.friendId === uid : item.userId === uid
    );

    return NextResponse.json(
      {
        alreadyExist,
        message: user,
        id: user?.id,
        userName: user?.userName,
        image: user?.image,
      },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "something webt wrong" },
      { status: 500 }
    );
  }
}
