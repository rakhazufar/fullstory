import prisma from "../../../libs/prismadb";

import { NextResponse } from "next/server";

export async function PATCH(request) {
  try {
    const { photoURL, email } = await request.json();
    if (!photoURL || !email) {
      return NextResponse("photoURL and email are required", {
        status: 400,
      });
    }

    const updatePhoto = await prisma.user.update({
      where: {
        email,
      },
      data: {
        image: photoURL,
      },
    });

    if (!updatePhoto) {
      return NextResponse("User not found", {
        status: 404,
      });
    }
    return NextResponse.json(updatePhoto);
  } catch (error) {
    console.error("Error updating photo:", error);
    return NextResponse("Internal Server Error", {
      status: 500,
    });
  }
}

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const params = url.searchParams;

    const email = params.get("email");
    if (!email) {
      return new NextResponse("email are required", {
        status: 400,
      });
    }

    const photoURL = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!photoURL) {
      return NextResponse("Image Not Found", {
        status: 404,
      });
    }
    return NextResponse.json(photoURL);
  } catch (error) {
    console.error("Error getting photo:", error);
    return NextResponse("Internal Server Error", {
      status: 500,
    });
  }
}
