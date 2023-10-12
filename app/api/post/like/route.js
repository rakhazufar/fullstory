import prisma from "../../../../libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const { postId, email } = body;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  try {
    await prisma.like.create({
      data: {
        postId,
        userId: user.id,
      },
    });

    return new NextResponse("Success", { status: 201 });
  } catch (err) {
    console.log(err);
    return new NextResponse(err, { status: 409 });
  }
}

export const DELETE = async (request) => {
  const url = new URL(request.url);
  console.log(request);
  const params = url.searchParams;

  const postId = params.get("postId");
  const email = params.get("email");

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

export async function GET(request) {
  const url = new URL(request.url);
  const params = url.searchParams;
  const postId = params.get("postId");
  try {
    const likeCount = await prisma.like.count({
      where: {
        postId,
      },
    });

    return NextResponse.json(likeCount);
  } catch (err) {
    console.log(err);
    return new NextResponse(err, { status: 409 });
  }
}
