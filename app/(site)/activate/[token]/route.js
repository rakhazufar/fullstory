import prisma from "@app/libs/prismadb";
import { redirect } from "next/navigation";

export async function GET(request, { params }) {
  const { token } = params;

  const user = await prisma.user.findFirst({
    where: {
      activateToken: {
        some: {
          AND: [
            // {
            //   activatedAt: null,
            // },
            {
              createdAt: {
                gt: new Date(Date.now() - 24 * 60 * 60 * 1000),
              },
            },
            {
              token,
            },
          ],
        },
      },
    },
  });

  console.log(user);

  if (!user) {
    throw new Error("Invalid Token");
  }

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      emailVerified: new Date(),
    },
  });

  await prisma.activateToken.update({
    where: {
      token,
    },
    data: {
      activatedAt: new Date(),
    },
  });

  redirect("/login");
}
