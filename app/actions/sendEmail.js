// pages/api/sendEmail.js
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // upgrade later with STARTTLS
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASS,
  },
});

export default async function sendEmail(subject, email, message, token) {
  const mailOptions = {
    from: `Fullstory <${process.env.SMTP_MAIL}>`,
    to: email,
    subject: subject,
    text: message,
    html: `<h4>${message}</h4> <a href='${process.env.NEXT_PUBLIC_BASE_URL}/activate/${token.token}'>Aktivasi Di Sini</a>`,
  };

  return new Promise((resolve, reject) => {
    transport.sendMail(mailOptions, (err, info) => {
      if (err) reject(err);
      resolve(info);
    });
  });
}
