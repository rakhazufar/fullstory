import bcrypt from "bcrypt";
import prisma from "../../libs/prismadb";
import { NextResponse } from "next/server";

function exclude(user, keys) {
  return Object.fromEntries(
    Object.entries(user).filter(([key]) => !keys.includes(key))
  );
}

function generateSlug(name, id) {
  const nameSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const idSuffix = id.substring(id.length - 3); // Ambil 3 karakter terakhir dari ID
  return `${nameSlug}-${idSuffix}`;
}

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

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      hashedPassword,
    },
  });

  const slug = generateSlug(user.name, user.id);
  await prisma.user.update({
    where: { id: user.id },
    data: { slug },
  });

  const userWithoutPassword = exclude(user, ["hashedPassword"]);

  return NextResponse.json(userWithoutPassword);
}
