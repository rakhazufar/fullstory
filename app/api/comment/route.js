import prisma from "../../../libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const { content, slug, postId } = await body;
  console.log(content, slug, postId);

  if (!content) {
    return new NextResponse("Please input your comment!", {
      status: 400,
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      slug,
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
  try {
    const allPost = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: true,
      },
    });

    return NextResponse.json(allPost);
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
