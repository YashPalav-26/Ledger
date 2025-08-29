import { type NextRequest, NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"
import { comparePassword, generateToken } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    // Check if database environment variables are configured
    if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_NAME) {
      console.error("Database configuration missing:", {
        DB_HOST: !!process.env.DB_HOST,
        DB_USER: !!process.env.DB_USER,
        DB_NAME: !!process.env.DB_NAME,
      })
      return NextResponse.json(
        { error: "Database configuration error. Please contact administrator." },
        { status: 500 }
      )
    }

    const { email, password } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Find user by email
    const users = (await executeQuery("SELECT id, email, password, first_name, last_name FROM users WHERE email = ?", [
      email,
    ])) as any[]

    if (users.length === 0) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    const user = users[0]

    // Verify password
    const isValidPassword = await comparePassword(password, user.password)
    if (!isValidPassword) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Generate token
    const token = generateToken(user)

    return NextResponse.json({
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
      },
      token,
    })
  } catch (error) {
    console.error("Login error details:", {
      error: error instanceof Error ? error.message : error,
      stack: error instanceof Error ? error.stack : undefined,
    })
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
