import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.ACCESS_TOKEN_SECRET || 'access_secret';
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET || 'refresh_secret';
const REFRESH_EXPIRES_IN= process.env.REFRESH_TOKEN_EXPIRES_IN;
const ACCESS_EXPIRES_IN= process.env.ACCESS_TOKEN_EXPIRES_IN || '15m';
export const JwtUtils = {
  generateAccessToken: (payload: object) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' }); // ngắn hạn
  },

  generateRefreshToken: (payload: object) => {
    return jwt.sign(payload, REFRESH_SECRET, { expiresIn: '7d' }); // dài hạn
  },

  verifyAccessToken: (token: string) => {
    return jwt.verify(token, JWT_SECRET);
  },

  verifyRefreshToken: (token: string) => {
    return jwt.verify(token, REFRESH_SECRET);
  }
};