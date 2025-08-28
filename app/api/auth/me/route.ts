import { type NextRequest, NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"
import { authenticateRequest } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const authData = authenticateRequest(request)
    if (!authData) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get user data
    const users = (await executeQuery("SELECT id, email, first_name, last_name, created_at FROM users WHERE id = ?", [
      authData.userId,
    ])) as any[]

    if (users.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const user = users[0]
    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        createdAt: user.created_at,
      },
    })
  } catch (error) {
    console.error("Get user error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
