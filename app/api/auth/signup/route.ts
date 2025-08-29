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
        allEnvVars: {
          DB_HOST: process.env.DB_HOST,
          DB_USER: process.env.DB_USER,
          DB_NAME: process.env.DB_NAME,
          DB_PORT: process.env.DB_PORT,
        }
      })
      return NextResponse.json(
        { error: "Database configuration error. Please contact administrator." },
        { status: 500 }
      )
    }

    // Log request details for debugging
    console.log("Signup attempt:", { timestamp: new Date().toISOString() })

    const body = await request.json()
    const { email, password, firstName, lastName } = body

    console.log("Signup request parsed:", {
      hasEmail: !!email,
      hasPassword: !!password,
      hasFirstName: !!firstName,
      hasLastName: !!lastName,
    })

    // Validate input
    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters long" }, { status: 400 })
    }

    // Check if user already exists
    console.log("Checking if user exists with email:", email)
    const existingUser = (await executeQuery("SELECT id FROM users WHERE email = ?", [email])) as any[]

    console.log("Existing user check result:", { existingUsers: existingUser.length })

    if (existingUser.length > 0) {
      console.log("User already exists with email:", email)
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
