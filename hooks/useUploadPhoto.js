"use server";
import path from "path";
import fs from "fs/promises";
import os from "os";

import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

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

export async function useUploadPhoto(formData) {
  try {
    const newFile = await savePhotoToLocal(formData);
    console.log(newFile);
  } catch (error) {
    return NextResponse.json({ errorMessage: error.message });
  }
}
