import prisma from "../../libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(request) {
  const url = new URL(request.url);
  const params = url.searchParams;
  const email = params.get("email");
  console.log(email);

  // function ini harus mereturn seluruh post yang dimiliki oleh user {email}
  const allPost = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: true,
    },
  });

  return NextResponse.json(allPost);
}
