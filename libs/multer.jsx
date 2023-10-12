import multer from 'multer';
import cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Konfigurasi Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// Inisialisasi objek storage Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'fullstory-profile', // Ganti dengan nama folder di Cloudinary
  allowedFormats: ['jpg', 'jpeg', 'png'],
  transformation: [{ width: 500, height: 500, crop: 'limit' }], // Opsi transformasi gambar
});

// Inisialisasi objek upload multer dengan storage Cloudinary
const upload = multer({ storage });

export default upload;
