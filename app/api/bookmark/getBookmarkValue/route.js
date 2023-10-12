import prisma from "../../../../libs/prismadb";
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

    const bookmarkedPost = await prisma.bookmark.findFirst({
      where: {
        userId: user.id,
        postId,
      },
    });
    if (!bookmarkedPost) {
      return NextResponse.json({ isBookmarked: false });
    }
    return NextResponse.json({ isBookmarked: true });
  } catch (error) {
    console.error(error);
    return new NextResponse({ body: "Internal Server Error", status: 500 });
  }
}
