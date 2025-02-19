import nodemailer from "nodemailer";

// Replace with your SMTP credentials
const smtpOptions = {
  host: process.env.NEXT_PUBLIC_SMTP_HOST,
  port: parseInt(process.env.NEXT_PUBLIC_SMTP_PORT),
  auth: {
    user: process.env.NEXT_PUBLIC_SMTP_USERNAME,
    pass: process.env.NEXT_PUBLIC_SMTP_PWD,
  },
  logger: Boolean(process.env.NEXT_PUBLIC_SMTP_LOG),
  connectionTimeout: 5000,
};

export const sendEmail = async (data) => {
  const transporter = nodemailer.createTransport({
    ...smtpOptions,
  });

  transporter.verify((err, success) => {
    // if (err) {
    //   console.error("SMTP connection error:", err);
    // } else {
    //   console.log("SMTP is ready to send messages.");
    // }
  });

  return await transporter.sendMail({
    from: process.env.NEXT_PUBLIC_SMTP_FROM,
    ...data,
  });
};

export default sendEmail;
