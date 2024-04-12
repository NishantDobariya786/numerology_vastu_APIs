import nodemailer from "nodemailer";
import { env } from "../../../config";

let emailTransporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: env.EMAIL,
    pass: env.PASSWORD,
  },
});

export { emailTransporter };
