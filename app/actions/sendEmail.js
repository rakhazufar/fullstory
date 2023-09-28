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

export default async function sendEmail(subject, email, message) {
  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject: subject,
    text: message,
    html: `<h1>${message}</h1>`,
  };

  return new Promise((resolve, reject) => {
    transport.sendMail(mailOptions, (err, info) => {
      if (err) reject(err);
      resolve(info);
    });
  });
}
