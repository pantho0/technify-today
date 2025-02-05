import nodemailer from "nodemailer";
import config from "../config";

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: config.NODEMAILER_GMAIL,
      pass: config.NODEMAILER_GMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: '"Technify Today" < >', // sender address
    to: to, // list of receivers
    subject: "Password Reset Link", // Subject line
    text: "This link is valid for only 10 minutes", // plain text body
    html: html, // html body
  });
};
