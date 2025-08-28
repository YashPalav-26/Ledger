"use client"

import { NoteCard } from "./note-card"
import { Loader2, FileText, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Note } from "@/lib/api"
import { useNotes } from "@/contexts/notes-context"

interface NotesGridProps {
  onEditNote: (note: Note) => void
}

export function NotesGrid({ onEditNote }: NotesGridProps) {
  const { notes, isLoading, selectedCategory, searchQuery, setSelectedCategory, setSearchQuery } = useNotes()

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="relative">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <div className="absolute inset-0 h-12 w-12 animate-ping rounded-full bg-primary/20"></div>
        </div>
        <p className="mt-4 text-muted-foreground animate-pulse">Loading your notes...</p>
      </div>
    )
  }

  if (notes.length === 0) {
    const isFiltered = searchQuery || selectedCategory !== "all"

    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center max-w-md mx-auto">
        <div className="relative mb-6">
          {isFiltered ? (
            <Search className="h-16 w-16 text-muted-foreground/50" />
          ) : (
            <FileText className="h-16 w-16 text-muted-foreground/50" />
          )}
          <div className="absolute -top-2 -right-2 h-6 w-6 bg-primary/10 rounded-full animate-pulse"></div>
        </div>

        <h3 className="text-xl font-semibold mb-3 text-balance">
          {isFiltered ? "No matching notes found" : "No notes yet"}
        </h3>

        <p className="text-muted-foreground mb-6 text-balance leading-relaxed">
          {isFiltered ? (
            <>
              We couldn't find any notes matching your current search or filter criteria. Try adjusting your search
              terms or selecting a different category.
            </>
          ) : (
            <>
              Start capturing your thoughts and ideas! Create your first note to begin organizing your digital
              workspace.
            </>
          )}
        </p>

        {isFiltered ? (
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline" onClick={() => setSearchQuery("")} className="gap-2">
              <Search className="h-4 w-4" />
              Clear Search
            </Button>
            <Button variant="outline" onClick={() => setSelectedCategory("all")} className="gap-2">
              <Filter className="h-4 w-4" />
              Show All Categories
            </Button>
          </div>
        ) : null}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Results summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {searchQuery || selectedCategory !== "all" ? (
            <>
              Found <span className="font-medium text-foreground">{notes.length}</span>
              {notes.length === 1 ? " note" : " notes"}
              {searchQuery && (
                <>
                  {" "}
                  matching "<span className="font-medium text-foreground">{searchQuery}</span>"
                </>
              )}
              {selectedCategory !== "all" && (
                <>
                  {" "}
                  in <span className="font-medium text-foreground capitalize">{selectedCategory}</span>
                </>
              )}
            </>
          ) : (
            <>
              <span className="font-medium text-foreground">{notes.length}</span>
              {notes.length === 1 ? " note" : " notes"} total
            </>
          )}
        </p>
      </div>

      {/* Enhanced responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 lg:gap-6">
        {notes.map((note, index) => (
          <div
            key={note.id}
            className="animate-in fade-in slide-in-from-bottom-4 duration-300"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <NoteCard note={note} onEdit={onEditNote} />
          </div>
        ))}
      </div>
    </div>
  )
}
