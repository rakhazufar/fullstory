import bcrypt from "bcrypt";
import prisma from "../../../libs/prismadb";
import { NextResponse } from "next/server";
import { generateSlug } from "@libs/slug";
import { randomUUID } from "crypto";
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

const createActivateToken = async (userId) => {
  const token = await prisma.activateToken.create({
    data: {
      token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ""),
      userId,
    },
  });

  return token;
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
    const token = await createActivateToken(newUser.id);
    console.log(token);
    const emailSend = await sendEmail(
      "Fullstory Email Activation",
      newUser.email,
      `hallo selamat datang di fullstory, saya tau kamu tidak sabar untuk membagikan seluruh kisah kamu. tapi kamu harus aktivasi email kamu dulu!`,
      token
    );

    console.log(emailSend);
  }

  const userWithoutPassword = exclude(newUser, ["hashedPassword"]);

  return NextResponse.json(userWithoutPassword);
}
