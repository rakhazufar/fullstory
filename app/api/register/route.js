import bcrypt from "bcrypt";
import prisma from "../../libs/prismadb";
import { NextResponse } from "next/server";
import { generateSlug } from "@app/libs/slug";
import sendEmail from "@app/actions/sendEmail";
function exclude(user, keys) {
  return Object.fromEntries(
    Object.entries(user).filter(([key]) => !keys.includes(key))
  );
}

const createUser = async (name, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      hashedPassword,
    },
  });

  const slug = generateSlug(user.name);
  await prisma.user.update({
    where: { id: user.id },
    data: { slug },
  });

  return user;
};

export async function POST(request) {
  const body = await request.json();
  const { name, email, password } = body;

  if (!name || !email || !password) {
    return new NextResponse("Missing Fields", { status: 400 });
  }

  const exist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (exist) {
    return new NextResponse("User already exist", { status: 409 });
  }

  const newUser = await createUser(name, email, password);

  if (newUser) {
    await sendEmail(
      "Ini email test",
      newUser.email,
      "tesstttt assalamualaikum pakettt!"
    );
  }

  const userWithoutPassword = exclude(newUser, ["hashedPassword"]);

  return NextResponse.json(userWithoutPassword);
}
