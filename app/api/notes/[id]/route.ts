import { type NextRequest, NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"
import { authenticateRequest } from "@/lib/auth"

// GET /api/notes/[id] - Get a specific note
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authData = authenticateRequest(request)
    if (!authData) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const notes = (await executeQuery(
      "SELECT id, title, content, category, is_favorite, created_at, updated_at FROM notes WHERE id = ? AND user_id = ?",
      [params.id, authData.userId],
    )) as any[]

    if (notes.length === 0) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 })
    }

    const note = notes[0]
    return NextResponse.json({
      note: {
        id: note.id,
        title: note.title,
        content: note.content,
        category: note.category,
        isFavorite: Boolean(note.is_favorite),
        createdAt: note.created_at,
        updatedAt: note.updated_at,
      },
    })
  } catch (error) {
    console.error("Get note error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// PUT /api/notes/[id] - Update a note
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authData = authenticateRequest(request)
    if (!authData) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { title, content, category, isFavorite } = await request.json()

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 })
    }

    // Check if note exists and belongs to user
    const existingNotes = (await executeQuery("SELECT id FROM notes WHERE id = ? AND user_id = ?", [
      params.id,
      authData.userId,
    ])) as any[]

    if (existingNotes.length === 0) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 })
    }

    // Update the note
    await executeQuery(
      "UPDATE notes SET title = ?, content = ?, category = ?, is_favorite = ? WHERE id = ? AND user_id = ?",
      [title, content, category || "general", isFavorite || false, params.id, authData.userId],
    )

    // Get updated note
    const updatedNotes = (await executeQuery(
      "SELECT id, title, content, category, is_favorite, created_at, updated_at FROM notes WHERE id = ?",
      [params.id],
    )) as any[]

    const note = updatedNotes[0]
    return NextResponse.json({
      message: "Note updated successfully",
      note: {
        id: note.id,
        title: note.title,
        content: note.content,
        category: note.category,
        isFavorite: Boolean(note.is_favorite),
        createdAt: note.created_at,
        updatedAt: note.updated_at,
      },
    })
  } catch (error) {
    console.error("Update note error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// DELETE /api/notes/[id] - Delete a note
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authData = authenticateRequest(request)
    if (!authData) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if note exists and belongs to user
    const existingNotes = (await executeQuery("SELECT id FROM notes WHERE id = ? AND user_id = ?", [
      params.id,
      authData.userId,
    ])) as any[]

    if (existingNotes.length === 0) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 })
    }

    // Delete the note
    await executeQuery("DELETE FROM notes WHERE id = ? AND user_id = ?", [params.id, authData.userId])

    return NextResponse.json({
      message: "Note deleted successfully",
    })
  } catch (error) {
    console.error("Delete note error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
