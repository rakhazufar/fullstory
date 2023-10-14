import prisma from "../../../libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const { content, email, postId } = await body;
  console.log(content, email, postId);

  if (!content) {
    return new NextResponse("Please input your comment!", {
      status: 400,
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return new NextResponse("User not found", { status: 404 });
  }

  try {
    const post = await prisma.comment.create({
      data: {
        content,
        userId: user.id,
        postId,
      },
    });
    return new NextResponse("Successfully added comment.", { status: 201 });
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(request) {
  const url = new URL(request.url);
  const params = url.searchParams;
  const postId = params.get("postId");
  console.log(postId);
  try {
    const allComment = await prisma.comment.findMany({
      where: {
        postId,
      },
      include: {
        user: true,
      },
    });

    return NextResponse.json(allComment);
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
