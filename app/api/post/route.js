import prisma from "../../libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const { content, email } = await body;
  console.log(content, email);

  if (!content) {
    return new NextResponse("Oops, you didn't input your story, I guess!", {
      status: 400,
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return new NextResponse("Something went wrong", { status: 404 });
  }

  try {
    const post = await prisma.post.create({
      data: {
        content,
        userId: user.id,
      },
    });

    return new NextResponse("Success to post story", { status: 201 });
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(request) {
  const allPost = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: true,
    },
  });

  return NextResponse.json(allPost);
}
