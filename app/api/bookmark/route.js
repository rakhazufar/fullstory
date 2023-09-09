import prisma from "../../libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const { postId, email } = body;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return new NextResponse("Something went wrong", { status: 404 });
  }

  try {
    const bookmark = await prisma.bookmark.create({
      data: {
        postId,
        userId: user.id,
      },
    });

    return new NextResponse("Success to bookmark post", { status: 201 });
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(request) {
  const url = new URL(request.url);
  const params = url.searchParams;
  const postId = params.get("postId");
  try {
    const totalBookmark = await prisma.bookmark.count({
      where: {
        postId,
      },
    });

    return NextResponse.json(totalBookmark);
  } catch (err) {
    console.log(err);
    return new NextResponse(err, { status: 409 });
  }
}

export const DELETE = async (request) => {
  const url = new URL(request.url);
  const params = url.searchParams;

  const postId = params.get("postId");
  const email = params.get("email");

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  try {
    const bookmarked = await prisma.bookmark.findFirst({
      where: {
        postId,
        userId: user.id,
      },
    });

    const unbookmarked = await prisma.bookmark.delete({
      where: {
        id: bookmarked.id,
      },
    });

    return new NextResponse("success unbookmark", { status: 200 });
  } catch (err) {
    console.error("errornya:", err);
    return new NextResponse("Error ini the server", { status: 500 });
  }
};
