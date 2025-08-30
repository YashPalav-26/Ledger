import { type NextRequest, NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"
import { authenticateRequest } from "@/lib/auth"

// GET /api/notes - Get all notes for authenticated user
export async function GET(request: NextRequest) {
  try {
    const authData = authenticateRequest(request)
    if (!authData) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const search = searchParams.get("search")

    let query = "SELECT id, title, content, category, is_favorite, created_at, updated_at FROM notes WHERE user_id = ?"
    const params: any[] = [authData.userId]

    if (category && category !== "all") {
      query += " AND category = ?"
      params.push(category)
    }

    if (search) {
      query += " AND (title LIKE ? OR content LIKE ?)"
      params.push(`%${search}%`, `%${search}%`)
    }

    query += " ORDER BY created_at DESC"

    const notes = (await executeQuery(query, params)) as any[]

    return NextResponse.json({
      notes: notes.map((note) => ({
        id: note.id,
        title: note.title,
        content: note.content,
        category: note.category,
        isFavorite: Boolean(note.is_favorite),
        createdAt: note.created_at,
        updatedAt: note.updated_at,
      })),
    })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// POST /api/notes - Create a new note
export async function POST(request: NextRequest) {
  try {
    const authData = authenticateRequest(request)
    if (!authData) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { title, content, category = "general" } = await request.json()

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 })
    }

    const result = (await executeQuery("INSERT INTO notes (user_id, title, content, category) VALUES (?, ?, ?, ?)", [
      authData.userId,
      title,
      content,
      category,
    ])) as any

    const newNote = (await executeQuery(
      "SELECT id, title, content, category, is_favorite, created_at, updated_at FROM notes WHERE id = ?",
      [result.insertId],
    )) as any[]

    const note = newNote[0]
    return NextResponse.json(
      {
        message: "Note created successfully",
        note: {
          id: note.id,
          title: note.title,
          content: note.content,
          category: note.category,
          isFavorite: Boolean(note.is_favorite),
          createdAt: note.created_at,
          updatedAt: note.updated_at,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
