import prisma from "../../libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(request) {
  const url = new URL(request.url);
  const params = url.searchParams;
  const userId = params.get("userId");
  console.log(userId);

  const allPost = await prisma.post.findMany({
    where: {
      userId: {
        endsWith: userId,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: true,
    },
  });

  if (!allPost) {
    return NextResponse.json({ success: false });
  }

  return NextResponse.json(allPost);
}
