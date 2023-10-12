import prisma from "../../../libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(request) {
  const url = new URL(request.url);
  const params = url.searchParams;
  const email = params.get("email");

  const userWithLikedPosts = await prisma.user.findUnique({
    where: {
      email: email,
    },
    include: {
      likes: {
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

  const likedPosts = userWithLikedPosts
    ? userWithLikedPosts.likes.map((like) => like.post)
    : [];

  return NextResponse.json(likedPosts);
}
