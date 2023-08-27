import prisma from "../../libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const { content, id } = await body;

  if (!content) {
    return new NextResponse("Missing Fields", { status: 400 });
  }

  const post = await prisma.post.create({
    data: {
      content,
      authorId: id,
    },
  });

  console.log(post);
  return NextResponse.json(post);
}
