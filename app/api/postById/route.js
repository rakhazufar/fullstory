import prisma from "../../../libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(request) {
  const url = new URL(request.url);
  const params = url.searchParams;
  const postId = params.get("postId");

  const postDetail = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    include: {
      author: true,
    },
  });

  return NextResponse.json(postDetail);
}
