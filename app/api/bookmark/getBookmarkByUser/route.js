import prisma from "../../../libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(request) {
  const url = new URL(request.url);
  const params = url.searchParams;
  const email = params.get("email");

  const userWithBookmarkedPosts = await prisma.user.findUnique({
    where: {
      email: email,
    },
    include: {
      bookmark: {
        select: {
          post: {
            include: {
              author: true,
            },
          },
        },
      },
    },
  });

  const bookmarkedPosts = userWithBookmarkedPosts
    ? userWithBookmarkedPosts.bookmark.map((bookmark) => bookmark.post)
    : [];

  return NextResponse.json(bookmarkedPosts);
}
