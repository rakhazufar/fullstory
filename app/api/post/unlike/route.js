import prisma from "../../../libs/prismadb";
import { NextResponse } from "next/server";

export const DELETE = async (request) => {
  console.log("api accessed");
  const body = await request.json();
  console.log(body);
  const { postId, email } = body;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  console.log(user);

  try {
    const liked = await prisma.like.findFirst({
      where: {
        postId,
        userId: user.id,
      },
    });

    console.log(liked);

    const unlike = await prisma.like.delete({
      where: {
        id: liked.id,
      },
    });

    return new NextResponse("success unlike", { status: 200 });
  } catch (err) {
    console.error("errornya:", err);
    return new NextResponse("Error ini the server", { status: 500 });
  }
};
