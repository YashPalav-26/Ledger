"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Loader2, Save, X } from "lucide-react"
import type { Note } from "@/lib/api"
import { useNotes } from "@/contexts/notes-context"

interface NoteFormProps {
  isOpen: boolean
  onClose: () => void
  note?: Note | null
}

const categories = [
  { value: "general", label: "General", color: "bg-gray-100 text-gray-800" },
  { value: "work", label: "Work", color: "bg-blue-100 text-blue-800" },
  { value: "personal", label: "Personal", color: "bg-green-100 text-green-800" },
  { value: "ideas", label: "Ideas", color: "bg-purple-100 text-purple-800" },
  { value: "todo", label: "To-Do", color: "bg-orange-100 text-orange-800" },
]

export function NoteForm({ isOpen, onClose, note }: NoteFormProps) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("general")
  const [isLoading, setIsLoading] = useState(false)

  const { createNote, updateNote } = useNotes()

  const isEditing = !!note
  const selectedCategoryData = categories.find((cat) => cat.value === category)

  useEffect(() => {
    if (note) {
      setTitle(note.title)
      setContent(note.content)
      setCategory(note.category)
    } else {
      setTitle("")
      setContent("")
      setCategory("general")
    }
  }, [note])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) return

    setIsLoading(true)

    const noteData = {
      title: title.trim(),
      content: content.trim(),
      category,
    }

    let success = false
    if (isEditing && note) {
      success = await updateNote(note.id, { ...noteData, isFavorite: note.isFavorite })
    } else {
      success = await createNote(noteData)
    }

    if (success) {
      onClose()
    }
    setIsLoading(false)
  }

  const handleClose = () => {
    if (!isLoading) {
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="shrink-0">
          <DialogTitle className="text-xl lg:text-2xl flex items-center gap-2">
            {isEditing ? "Edit Note" : "Create New Note"}
            {selectedCategoryData && (
              <Badge className={`text-xs ${selectedCategoryData.color} border-0`}>{selectedCategoryData.label}</Badge>
            )}
          </DialogTitle>
          <DialogDescription>
            {isEditing ? "Make changes to your note below." : "Capture your thoughts and organize them beautifully."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="grid gap-6 py-4 flex-1 overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 space-y-2">
                <Label htmlFor="title" className="text-sm font-medium">
                  Title <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="title"
                  placeholder="Enter a descriptive title for your note..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="h-11 text-base"
                  maxLength={255}
                />
                <p className="text-xs text-muted-foreground">{title.length}/255 characters</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="category" className="text-sm font-medium">
                  Category
                </Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${cat.color.split(" ")[0]}`}></div>
                          {cat.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2 flex-1 flex flex-col">
              <Label htmlFor="content" className="text-sm font-medium">
                Content <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="content"
                placeholder="Write your note content here... You can include ideas, tasks, reminders, or anything else you'd like to remember."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                className="resize-none flex-1 min-h-[200px] text-base leading-relaxed"
                maxLength={10000}
              />
              <p className="text-xs text-muted-foreground">{content.length}/10,000 characters</p>
            </div>
          </div>

          <DialogFooter className="shrink-0 gap-2 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
              className="gap-2 bg-transparent"
            >
              <X className="h-4 w-4" />
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading || !title.trim() || !content.trim()}
              className="gap-2 min-w-[120px]"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {isLoading ? "Saving..." : isEditing ? "Update Note" : "Create Note"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
