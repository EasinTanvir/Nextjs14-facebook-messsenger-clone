import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prismaClient";
interface Props {
  params: { uid: string };
}
export async function GET(req: NextRequest, { params: { uid } }: Props) {
  console.log(uid);
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: uid,
      },
    });
    return NextResponse.json({ message: user }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { message: "something webt wrong" },
      { status: 500 }
    );
  }
}
