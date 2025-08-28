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
    <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 lg:py-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <h1 className="text-2xl lg:text-3xl font-bold text-primary mb-1">Ledger</h1>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>Welcome back, {user?.firstName}!</span>
                </div>
                <div className="hidden sm:block text-muted-foreground/50">•</div>
                <div className="flex items-center gap-4">
                  <Badge variant="secondary" className="gap-1">
                    <span>{totalNotes}</span>
                    <span className="hidden sm:inline">notes</span>
                  </Badge>
                  {favoriteNotes > 0 && (
                    <Badge variant="outline" className="gap-1 text-red-500 border-red-200">
                      <Heart className="h-3 w-3 fill-current" />
                      <span>{favoriteNotes}</span>
                      <span className="hidden sm:inline">favorites</span>
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 lg:gap-3">
            <Button onClick={onCreateNote} className="gap-2 flex-1 sm:flex-none">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">New Note</span>
              <span className="sm:hidden">New</span>
            </Button>
            <Button variant="outline" onClick={logout} className="gap-2 bg-transparent">
              <LogOut className="h-4 w-4" />
              <span className="hidden lg:inline">Logout</span>
            </Button>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-3 lg:gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search your notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11 bg-background/50 border-border/50 focus:bg-background focus:border-primary/50 transition-colors"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full lg:w-[200px] h-11 bg-background/50 border-border/50">
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
