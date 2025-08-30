import { type NextRequest, NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"
import { comparePassword, generateToken } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    // Check if database environment variables are configured
    if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_NAME) {
      return NextResponse.json(
        { error: "Database configuration error. Please contact administrator." },
        { status: 500 }
      )
    }

    let body
    try {
      body = await request.json()
    } catch (parseError) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
    }
    const { email, password } = body

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Find user by email
    let users
    try {
      users = (await executeQuery("SELECT id, email, password, first_name, last_name FROM users WHERE email = ?", [
        email,
      ])) as any[]
    } catch (dbError) {
      throw dbError
    }

    if (!users || users.length === 0) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    const user = users[0]

    // Verify password
    try {
      const isValidPassword = await comparePassword(password, user.password)
      if (!isValidPassword) {
        return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
      }
    } catch (passwordError) {
      throw passwordError
    }

    // Generate token
    let token
    try {
      token = generateToken(user)
    } catch (tokenError) {
      throw tokenError
    }

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
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
