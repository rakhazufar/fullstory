"use server";

import path from "path";
import fs from "fs/promises";
import os from "os";

import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import cloudinary from "cloudinary";
import axios from "axios";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

async function savePhotoToLocal(formData) {
  const file = formData.get("file");
  const bufferPromise = file.arrayBuffer().then((data) => {
    const buffer = Buffer.from(data);
    const name = uuidv4();
    const ext = file.type.split("/")[1];
    const tempdir = os.tmpdir();
    const uploadDir = path.join(tempdir, `/${name}.${ext}`);

    fs.writeFile(uploadDir, buffer);
    return { filepath: uploadDir, filename: file.name };
  });

  return bufferPromise;
}

async function uploadPhotoToCloudinary(newFile) {
  const photoBuffer = cloudinary.v2.uploader.upload(newFile.filepath, {
    folder: "fullstory-profile",
  });

  return photoBuffer;
}

async function savePhotoURLtoDatabase(photo, email) {
  const res = await axios.patch(`${baseUrl}/api/photo/profile`, {
    photoURL: photo.url,
    email,
  });
  return await res.data;
}

export async function useUploadPhoto(formData, email) {
  try {
    const newFile = await savePhotoToLocal(formData);

    const photo = await uploadPhotoToCloudinary(newFile);

    fs.unlink(newFile.filepath);

    const file = await savePhotoURLtoDatabase(photo, email.email);

    return file;
  } catch (error) {
    console.log(error);
    return error;
  }
}
