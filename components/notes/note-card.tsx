"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Heart, MoreVertical, Edit, Trash2, Calendar, Clock } from "lucide-react"
import type { Note } from "@/lib/api"
import { useNotes } from "@/contexts/notes-context"
import { formatDistanceToNow } from "date-fns"

interface NoteCardProps {
  note: Note
  onEdit: (note: Note) => void
}

export function NoteCard({ note, onEdit }: NoteCardProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [isToggling, setIsToggling] = useState(false)
  const { deleteNote, toggleFavorite } = useNotes()

  const handleDelete = async () => {
    setIsDeleting(true)
    await deleteNote(note.id)
    setIsDeleting(false)
  }

  const handleToggleFavorite = async () => {
    setIsToggling(true)
    await toggleFavorite(note.id)
    setIsToggling(false)
  }

  const truncateContent = (content: string, maxLength = 120) => {
    if (content.length <= maxLength) return content
    return content.substring(0, maxLength) + "..."
  }

  return (
    <Card className="group hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1 cursor-pointer border-border/50 hover:border-primary/20 bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-base lg:text-lg leading-tight text-balance line-clamp-2 group-hover:text-primary transition-colors">
            {note.title}
          </h3>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200 shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleToggleFavorite}
              disabled={isToggling}
              className={`h-8 w-8 p-0 transition-colors ${
                note.isFavorite ? "text-red-500 hover:text-red-600" : "text-muted-foreground hover:text-red-500"
              }`}
            >
              <Heart className={`h-4 w-4 transition-all ${note.isFavorite ? "fill-current scale-110" : ""}`} />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-primary/10">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem onClick={() => onEdit(note)} className="gap-2">
                  <Edit className="h-4 w-4" />
                  Edit Note
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="text-destructive focus:text-destructive gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  {isDeleting ? "Deleting..." : "Delete"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-4">{truncateContent(note.content)}</p>
      </CardContent>
      <CardFooter className="pt-0 flex items-center justify-between gap-2">
        <Badge
          variant="secondary"
          className="text-xs capitalize bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
        >
          {note.category}
        </Badge>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span className="hidden sm:inline">
              {formatDistanceToNow(new Date(note.createdAt), { addSuffix: true })}
            </span>
            <span className="sm:hidden">
              {formatDistanceToNow(new Date(note.createdAt), { addSuffix: true }).replace(" ago", "")}
            </span>
          </div>
          {note.updatedAt !== note.createdAt && (
            <div className="flex items-center gap-1 text-accent">
              <Clock className="h-3 w-3" />
              <span className="hidden sm:inline">edited</span>
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
