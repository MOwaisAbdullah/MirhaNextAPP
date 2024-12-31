import mailer from "nodemailer";

const transporter = mailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });
  export default transporter;
