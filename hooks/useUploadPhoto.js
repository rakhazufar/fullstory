"use server";

import path from "path";
import fs from "fs/promises";
import os from "os";

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

function getPublicID(imageURL) {
  const splitUrl = imageURL.split("/");
  const publicIdWithExtension = `${splitUrl[splitUrl.length - 2]}/${
    splitUrl[splitUrl.length - 1]
  }`;
  const publicId = publicIdWithExtension.split(".")[0];
  return publicId;
}

async function deletePhotoFromCloudinary({ imageURL }) {
  const publicID = getPublicID(imageURL);
  try {
    const result = await cloudinary.v2.uploader.destroy(publicID);
    console.log("Foto berhasil dihapus:", result); // Debug: cetak hasil ke konsol
  } catch (error) {
    console.error("Gagal menghapus foto:", error); // Debug: cetak kesalahan ke konsol
  }
}

async function savePhotoURLtoDatabase(photo, email) {
  const res = await axios.patch(`${baseUrl}/api/photo/profile`, {
    photoURL: photo.url,
    email,
  });
  return await { data: res.data, status: res.statusText };
}

export async function useUploadPhoto(formData, email, imageURL) {
  try {
    const newFile = await savePhotoToLocal(formData);

    const photo = await uploadPhotoToCloudinary(newFile);

    fs.unlink(newFile.filepath);

    const file = await savePhotoURLtoDatabase(photo, email.email);
    await deletePhotoFromCloudinary(imageURL);

    return file;
  } catch (error) {
    console.log(error);
    return error;
  }
}
