import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prismaClient";
interface Props {
  params: { uid: string };
}
export async function GET(req: NextRequest, { params: { uid } }: Props) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: uid,
      },
    });

    const alreadyExist = user?.friends.some((item) => item.userId === uid);

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
