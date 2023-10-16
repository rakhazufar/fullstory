import prisma from "@libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(request) {
  const url = new URL(request.url);
  const params = url.searchParams;
  const postId = params.get("postId");
  try {
    const totalComment = await prisma.comment.count({
      where: {
        postId,
      },
    });

    return NextResponse.json(totalComment);
  } catch (err) {
    console.log(err);
    return new NextResponse(err, { status: 409 });
  }
}
