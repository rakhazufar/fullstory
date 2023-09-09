import prisma from "../../../libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const params = url.searchParams;

    const postId = params.get("postId");
    const email = params.get("email");

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    const likedPost = await prisma.like.findFirst({
      where: {
        userId: user.id,
        postId,
      },
    });
    if (!likedPost) {
      return NextResponse.json({ isLiked: false });
    }
    return NextResponse.json({ isLiked: true });
  } catch (error) {
    console.error(error);
    return new NextResponse({ body: "Internal Server Error", status: 500 });
  }
}
