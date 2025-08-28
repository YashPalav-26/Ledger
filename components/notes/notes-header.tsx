"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, LogOut, User, Heart } from "lucide-react"
import { useNotes } from "@/contexts/notes-context"
import { useAuth } from "@/contexts/auth-context"
import { Badge } from "@/components/ui/badge"

interface NotesHeaderProps {
  onCreateNote: () => void
}

const categories = [
  { value: "all", label: "All Notes" },
  { value: "general", label: "General" },
  { value: "work", label: "Work" },
  { value: "personal", label: "Personal" },
  { value: "ideas", label: "Ideas" },
  { value: "todo", label: "To-Do" },
]

export function NotesHeader({ onCreateNote }: NotesHeaderProps) {
  const { selectedCategory, setSelectedCategory, searchQuery, setSearchQuery, notes } = useNotes()
  const { user, logout } = useAuth()

  const totalNotes = notes.length
  const favoriteNotes = notes.filter((note) => note.isFavorite).length

  return (
        <div className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 lg:py-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Ledger</h1>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Welcome back, {user?.firstName}!</span>
              </div>
              <div className="hidden sm:block text-muted-foreground/50">•</div>
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="gap-1 px-2 py-1">
                  <span>{totalNotes}</span>
                  <span className="hidden xs:inline">notes</span>
                </Badge>
                {favoriteNotes > 0 && (
                  <Badge variant="outline" className="gap-1 px-2 py-1 text-red-500 border-red-200">
                    <Heart className="h-3 w-3 fill-current" />
                    <span>{favoriteNotes}</span>
                    <span className="hidden xs:inline">favorites</span>
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 lg:gap-4 self-start lg:self-center">
            <Button onClick={onCreateNote} variant="brutalist" className="gap-2 px-6 py-3 min-w-[140px]">
              <Plus className="h-4 w-4" />
              <span className="font-mono font-bold tracking-wide hidden sm:inline">New Note</span>
              <span className="font-mono font-bold tracking-wide sm:hidden">Add</span>
            </Button>
            <Button variant="outline" onClick={logout} className="gap-2 bg-transparent px-4 py-3">
              <LogOut className="h-4 w-4" />
              <span className="hidden lg:inline">Logout</span>
            </Button>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search your notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 bg-background/50 border-border/50 focus:bg-background focus:border-primary/50 transition-colors text-base"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-[220px] h-12 bg-background/50 border-border/50 text-base">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
