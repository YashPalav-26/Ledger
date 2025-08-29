import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import type { NextRequest } from "next/server"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production"

// Validate JWT_SECRET on startup
if (!process.env.JWT_SECRET) {
  console.warn("Warning: JWT_SECRET not set in environment variables. Using default secret.")
}

export interface User {
  id: number
  email: string
  first_name: string
  last_name: string
}

export interface JwtPayload {
  userId: number
  email: string
}

export function generateToken(user: User): string {
  try {
    const payload: JwtPayload = {
      userId: user.id,
      email: user.email,
    }
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" })
  } catch (error) {
    console.error("Error generating JWT token:", error)
    throw new Error("Failed to generate authentication token")
  }
}

export function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload
  } catch (error) {
    return null
  }
}

export async function hashPassword(password: string): Promise<string> {
  try {
    return await bcrypt.hash(password, 10)
  } catch (error) {
    console.error("Error hashing password:", error)
    throw new Error("Failed to hash password")
  }
}

export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  try {
    return await bcrypt.compare(password, hashedPassword)
  } catch (error) {
    console.error("Error comparing password:", error)
    throw new Error("Failed to verify password")
  }
}

export function getTokenFromRequest(request: NextRequest): string | null {
  const authHeader = request.headers.get("authorization")
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.substring(7)
  }
  return null
}

export function authenticateRequest(request: NextRequest): JwtPayload | null {
  const token = getTokenFromRequest(request)
  if (!token) return null
  return verifyToken(token)
}
