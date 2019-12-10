import { isProd } from "../utils/env.utils";

export const SEND_MAIL_PATH = isProd()
  ? "/api/sendMail"
  : "http://localhost:8000/api/sendMail";
