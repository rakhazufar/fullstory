import prisma from "../../libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(request) {
  const url = new URL(request.url);
  const params = url.searchParams;
  const slug = params.get("slug");

  const allPost = await prisma.user.findFirst({
    where: {
      slug: slug,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      post: {
        include: {
          author: true,
        },
      },
    },
  });

  if (!allPost) {
    return NextResponse.json({ success: false });
  }

  return NextResponse.json(allPost);
}
