import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prismaClient";
import bcrypt from "bcryptjs";

function validate(text: any) {
  return !text || text.trim() === "";
}

export async function POST(req: NextRequest) {
  const { userName, email, password } = await req.json();

  if (validate(userName) || validate(email) || validate(password)) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 500 }
    );
  }

  let hashPass, existingUser;

  try {
    existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
  } catch (err) {
    return NextResponse.json({ message: "find user failed" }, { status: 500 });
  }

  if (existingUser) {
    return NextResponse.json(
      { email: "Sorry email already taken" },
      { status: 401 }
    );
  }
  if (password.trim().length < 6) {
    return NextResponse.json(
      { password: "Password should contain at least 6 character" },
      { status: 401 }
    );
  }

  try {
    hashPass = await bcrypt.hash(password, 10);
  } catch (err) {
    return NextResponse.json(
      { message: "Password hashed failed" },
      { status: 500 }
    );
  }

  try {
    const user = await prisma.user.create({
      data: {
        userName,
        email,
        password: hashPass,
      },
    });
    return NextResponse.json({ user }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { message: "Create user failed" },
      { status: 500 }
    );
  }
}
