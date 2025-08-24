// lib/jwt.js
import { JWT } from "@/utils/constant";
import jwt from "jsonwebtoken";

const JWT_SECRET = JWT.accessTokenSecret;
const JWT_EXPIRES_IN = JWT.accessTokenExpiresIn;

/**
 * Sign a JWT token with payload
 * @param {Object} payload - any object like { id, email, name, role }
 * @returns {string} JWT token
 */
export function signToken(payload) {
  if (!JWT_SECRET) throw new Error("JWT_SECRET is not defined");
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

/**
 * Verify JWT token from request cookies
 * @param {Request} req - Next.js request object
 * @returns {Object|null} decoded payload or null if invalid
 */
export const getUserFromToken = (req) => {
  if (!JWT_SECRET) throw new Error("JWT_SECRET is not defined");

  const authHeader = req.headers.get("authorization"); // Authorization header
  if (!authHeader || !authHeader.startsWith("Bearer ")) return null;

  const token = authHeader.split(" ")[1]; // Extract token
  if (!token) return null;

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    return payload;
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    return null;
  }
};
