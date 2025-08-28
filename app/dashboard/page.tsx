"use client"

import { useState } from "react"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { NotesProvider } from "@/contexts/notes-context"
import { NotesHeader } from "@/components/notes/notes-header"
import { NotesGrid } from "@/components/notes/notes-grid"
import { NoteForm } from "@/components/notes/note-form"
import type { Note } from "@/lib/api"

function DashboardContent() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingNote, setEditingNote] = useState<Note | null>(null)

  const handleCreateNote = () => {
    setEditingNote(null)
    setIsFormOpen(true)
  }

  const handleEditNote = (note: Note) => {
    setEditingNote(note)
    setIsFormOpen(true)
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setEditingNote(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-primary/5">
      <NotesHeader onCreateNote={handleCreateNote} />
      <main className="container mx-auto px-4 py-6 lg:py-8">
        <NotesGrid onEditNote={handleEditNote} />
      </main>
      <NoteForm isOpen={isFormOpen} onClose={handleCloseForm} note={editingNote} />
    </div>
  )
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <NotesProvider>
        <DashboardContent />
      </NotesProvider>
    </ProtectedRoute>
  )
}
