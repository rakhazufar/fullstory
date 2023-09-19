"use server";

import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

async function getPhotoURLtoDatabase(email) {
  console.log(email);
  const res = await axios.get(`${baseUrl}/api/profile`, {
    params: {
      slug,
    },
  });
  return await res.data;
}

export async function useGetPhotoByEmail(email) {
  try {
    console.log(email);
    const file = await getPhotoURLtoDatabase(email);
    console.log(file);

    return file;
  } catch (error) {
    console.log(error);
    return error;
  }
}
