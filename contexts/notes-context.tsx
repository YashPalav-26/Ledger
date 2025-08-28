"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { apiClient, type Note } from "@/lib/api"
import { useAuth } from "@/contexts/auth-context"

interface NotesContextType {
  notes: Note[]
  isLoading: boolean
  selectedCategory: string
  searchQuery: string
  createNote: (noteData: { title: string; content: string; category?: string }) => Promise<boolean>
  updateNote: (
    id: number,
    noteData: { title: string; content: string; category?: string; isFavorite?: boolean },
  ) => Promise<boolean>
  deleteNote: (id: number) => Promise<boolean>
  setSelectedCategory: (category: string) => void
  setSearchQuery: (query: string) => void
  refreshNotes: () => Promise<void>
  toggleFavorite: (id: number) => Promise<boolean>
}

const NotesContext = createContext<NotesContextType | undefined>(undefined)

export function NotesProvider({ children }: { children: React.ReactNode }) {
  const [notes, setNotes] = useState<Note[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const { isAuthenticated } = useAuth()

  const refreshNotes = async () => {
    if (!isAuthenticated) return

    setIsLoading(true)
    const params: { category?: string; search?: string } = {}
    if (selectedCategory !== "all") params.category = selectedCategory
    if (searchQuery) params.search = searchQuery

    const response = await apiClient.getNotes(params)
    if (response.data) {
      setNotes(response.data.notes)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    refreshNotes()
  }, [isAuthenticated, selectedCategory, searchQuery])

  const createNote = async (noteData: { title: string; content: string; category?: string }) => {
    const response = await apiClient.createNote(noteData)
    if (response.data) {
      setNotes((prev) => [response.data.note, ...prev])
      return true
    }
    return false
  }

  const updateNote = async (
    id: number,
    noteData: { title: string; content: string; category?: string; isFavorite?: boolean },
  ) => {
    const response = await apiClient.updateNote(id, noteData)
    if (response.data) {
      setNotes((prev) => prev.map((note) => (note.id === id ? response.data.note : note)))
      return true
    }
    return false
  }

  const deleteNote = async (id: number) => {
    const response = await apiClient.deleteNote(id)
    if (!response.error) {
      setNotes((prev) => prev.filter((note) => note.id !== id))
      return true
    }
    return false
  }

  const toggleFavorite = async (id: number) => {
    const note = notes.find((n) => n.id === id)
    if (!note) return false

    return updateNote(id, {
      title: note.title,
      content: note.content,
      category: note.category,
      isFavorite: !note.isFavorite,
    })
  }

  return (
    <NotesContext.Provider
      value={{
        notes,
        isLoading,
        selectedCategory,
        searchQuery,
        createNote,
        updateNote,
        deleteNote,
        setSelectedCategory,
        setSearchQuery,
        refreshNotes,
        toggleFavorite,
      }}
    >
      {children}
    </NotesContext.Provider>
  )
}

export function useNotes() {
  const context = useContext(NotesContext)
  if (context === undefined) {
    throw new Error("useNotes must be used within a NotesProvider")
  }
  return context
}
