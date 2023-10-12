"use server";

import sendEmail from "@app/actions/sendEmail";
import prisma from "@libs/prismadb";
import { randomUUID } from "crypto";

const createActivateToken = async (userId) => {
  const token = await prisma.activateToken.create({
    data: {
      token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ""),
      userId,
    },
  });

  return token;
};

const sendEmailVerify = async (email, userId) => {
  const token = await createActivateToken(userId);
  await sendEmail(
    "Fullstory Email Activation",
    email,
    `hallo selamat datang di fullstory, saya tau kamu tidak sabar untuk membagikan seluruh kisah kamu. tapi kamu harus aktivasi email kamu dulu!`,
    token
  );
};

export default sendEmailVerify;
