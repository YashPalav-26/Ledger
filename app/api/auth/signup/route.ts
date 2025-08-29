import { type NextRequest, NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"
import { hashPassword, generateToken } from "@/lib/auth"

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

    const { email, password, firstName, lastName } = await request.json()

    // Validate input
    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters long" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = (await executeQuery("SELECT id FROM users WHERE email = ?", [email])) as any[]

    if (existingUser.length > 0) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 })
    }

    // Hash password and create user
    const hashedPassword = await hashPassword(password)
    const result = (await executeQuery(
      "INSERT INTO users (email, password, first_name, last_name) VALUES (?, ?, ?, ?)",
      [email, hashedPassword, firstName, lastName],
    )) as any

    // Get the created user
    const newUser = (await executeQuery("SELECT id, email, first_name, last_name FROM users WHERE id = ?", [
      result.insertId,
    ])) as any[]

    const user = newUser[0]
    const token = generateToken(user)

    return NextResponse.json(
      {
        message: "User created successfully",
        user: {
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
        },
        token,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Signup error details:", {
      error: error instanceof Error ? error.message : error,
      stack: error instanceof Error ? error.stack : undefined,
    })
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
