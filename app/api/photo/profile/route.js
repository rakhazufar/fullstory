import upload from "@app/libs/multer";
import { NextResponse } from 'next/server'
export const config = {
    api: {
      bodyParser: false,
    },
  };
  
  export async function POST(req) {
    try {
      // Use upload.single() to handle file upload
      upload.single('file')(req, res, async (err) => {
        if (err) {
          console.error(err);
          return res.status(400).json({ error: 'Terjadi kesalahan saat meng-upload file' });
        }
  
        const file = req.file;
        const email = req.body.email;
  
        console.log(file); // File object
        console.log(email); // Email value
  
        // Perform desired operations with file and email
        const updateUser = await prisma.user.update({
          where: {
            email: email,
          },
          data: {
            image: file.filename,
          },
        });
  
        // Send success response
        res.status(200).json({ message: 'File dan data berhasil diterima' });
      });
    } catch (error) {
      // Handle errors if any
      console.error(error);
      res.status(500).json({ error: 'Terjadi kesalahan server' });
    }
  }