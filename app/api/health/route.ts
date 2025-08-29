import { NextResponse } from "next/server"
import { testDatabaseConnection } from "@/lib/db"

export async function GET() {
  try {
    console.log("Health check initiated")

    // Check environment variables (without exposing sensitive info)
    const envStatus = {
      DB_HOST: !!process.env.DB_HOST,
      DB_USER: !!process.env.DB_USER,
      DB_PASSWORD: !!process.env.DB_PASSWORD,
      DB_NAME: !!process.env.DB_NAME,
      DB_PORT: !!process.env.DB_PORT,
      JWT_SECRET: !!process.env.JWT_SECRET,
    }

    console.log("Environment variables status:", envStatus)

    // Test database connection if all env vars are present
    const hasAllRequiredEnvVars = Object.values(envStatus).every(Boolean) &&
                                  process.env.DB_HOST !== "" &&
                                  process.env.DB_USER !== "" &&
                                  process.env.DB_NAME !== ""

    if (!hasAllRequiredEnvVars) {
      console.error("Missing required environment variables")
      return NextResponse.json({
        status: "error",
        message: "Missing required environment variables",
        envVars: envStatus,
        timestamp: new Date().toISOString()
      }, { status: 500 })
    }

    const dbConnected = await testDatabaseConnection()

    if (!dbConnected) {
      return NextResponse.json({
        status: "error",
        message: "Database connection failed",
        envVars: envStatus,
        timestamp: new Date().toISOString()
      }, { status: 500 })
    }

    return NextResponse.json({
      status: "healthy",
      message: "All systems operational",
      envVars: envStatus,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error("Health check failed:", {
      error: error instanceof Error ? error.message : error,
      stack: error instanceof Error ? error.stack : undefined
    })

    return NextResponse.json({
      status: "error",
      message: "Health check failed",
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}