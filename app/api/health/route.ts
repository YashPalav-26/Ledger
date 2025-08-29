import { NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"

export async function GET() {
  try {
    // Check if environment variables are configured
    const requiredEnvVars = ["DB_HOST", "DB_USER", "DB_NAME"]
    const missingVars = requiredEnvVars.filter(varName => !process.env[varName])
    
    if (missingVars.length > 0) {
      return NextResponse.json({
        status: "error",
        message: "Database configuration incomplete",
        missingVars,
      }, { status: 500 })
    }

    // Test database connection
    await executeQuery("SELECT 1 as test")
    
    return NextResponse.json({
      status: "healthy",
      message: "Database connection successful",
    })
  } catch (error) {
    console.error("Health check failed:", error)
    return NextResponse.json({
      status: "error",
      message: "Database connection failed",
      error: error instanceof Error ? error.message : "Unknown error",
    }, { status: 500 })
  }
}