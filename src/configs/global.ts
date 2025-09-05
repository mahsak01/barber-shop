export const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const IS_DEVELOPMENT = process.env.NODE_ENV === "development";
export const IS_PRODUCTION = process.env.NODE_ENV === "production";

export const port = process.env.PORT || 3000;
export const host = process.env.PROJECT_PRODUCTION_URL
  ? `https://${process.env.PROJECT_PRODUCTION_URL}`
  : `http://localhost:${port}`;

export const OTP_EXPIRATION_TIME = 1000 * 60 * 1;
