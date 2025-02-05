import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt: process.env.bcrypt_salt,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_access_secret_exp: process.env.JWT_ACCESS_SECRET_EXP,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_refresh_secret_exp: process.env.JWT_REFRESH_SECRET_EXP,
  reset_ui_link: process.env.RESET_UI_LINK,
  NODEMAILER_GMAIL: process.env.NODEMAILER_GMAIL,
  NODEMAILER_GMAIL_PASS: process.env.NODEMAILER_GMAIL_PASS,
};
