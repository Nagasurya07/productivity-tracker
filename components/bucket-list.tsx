"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Check, Clock, Edit, Plus, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type BucketListItem = {
  id: string
  title: string
  description: string
  targetDate: Date | undefined
  completed: boolean
  category: string
}

export default function BucketList() {
  const [items, setItems] = useState<BucketListItem[]>([
    {
      id: "1",
      title: "Visit Japan during cherry blossom season",
      description: "Experience the beauty of sakura in Tokyo and Kyoto",
      targetDate: new Date(2025, 3, 15),
      completed: false,
      category: "travel",
    },
    {
      id: "2",
      title: "Learn to play the guitar",
      description: "Take lessons and practice regularly to play my favorite songs",
      targetDate: new Date(2025, 11, 31),
      completed: false,
      category: "skill",
    },
    {
      id: "3",
      title: "Run a half marathon",
      description: "Train for and complete a half marathon race",
      targetDate: new Date(2025, 9, 10),
      completed: true,
      category: "fitness",
    },
    {
      id: "4",
      title: "Write a novel",
      description: "Complete a 50,000 word fiction novel",
      targetDate: new Date(2026, 0, 1),
      completed: false,
      category: "creative",
    },
  ])

  const [newTitle, setNewTitle] = useState("")
  const [newDescription, setNewDescription] = useState("")
  const [newDate, setNewDate] = useState<Date>()
  const [newCategory, setNewCategory] = useState("travel")
  const [editItem, setEditItem] = useState<BucketListItem | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const addItem = () => {
    if (newTitle.trim() === "") return

    const item: BucketListItem = {
      id: Date.now().toString(),
      title: newTitle,
      description: newDescription,
      targetDate: newDate,
      completed: false,
      category: newCategory,
    }

    setItems([...items, item])
    setNewTitle("")
    setNewDescription("")
    setNewDate(undefined)
    setNewCategory("travel")
  }

  const toggleComplete = (id: string) => {
    setItems(items.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)))
  }

  const deleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const openEditDialog = (item: BucketListItem) => {
    setEditItem(item)
    setIsDialogOpen(true)
  }

  const saveEdit = () => {
    if (!editItem) return

    setItems(items.map((item) => (item.id === editItem.id ? editItem : item)))

    setEditItem(null)
    setIsDialogOpen(false)
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "travel":
        return "bg-blue-100 text-blue-800"
      case "skill":
        return "bg-purple-100 text-purple-800"
      case "fitness":
        return "bg-green-100 text-green-800"
      case "creative":
        return "bg-amber-100 text-amber-800"
      case "career":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add to Your Bucket List</CardTitle>
          <CardDescription>What do you want to accomplish in your lifetime?</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter a bucket list item"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Add more details about this goal"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Target Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("justify-start text-left font-normal", !newDate && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {newDate ? format(newDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={newDate} onSelect={setNewDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid gap-2">
              <Label>Category</Label>
              <Select value={newCategory} onValueChange={setNewCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="travel">Travel</SelectItem>
                  <SelectItem value="skill">Skill</SelectItem>
                  <SelectItem value="fitness">Fitness</SelectItem>
                  <SelectItem value="creative">Creative</SelectItem>
                  <SelectItem value="career">Career</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={addItem} className="w-full">
            <Plus className="mr-2 h-4 w-4" /> Add to Bucket List
          </Button>
        </CardFooter>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <Card key={item.id} className={cn("transition-all", item.completed && "opacity-60")}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className={cn("text-lg", item.completed && "line-through")}>{item.title}</CardTitle>
                  <CardDescription className="mt-1">{item.description}</CardDescription>
                </div>
                <Badge variant="outline" className={cn("ml-2", getCategoryColor(item.category))}>
                  {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              {item.targetDate && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-1 h-3 w-3" />
                  Target: {format(item.targetDate, "MMMM d, yyyy")}
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between pt-2">
              <Button
                variant="ghost"
                size="sm"
                className={cn(item.completed ? "text-green-600" : "text-muted-foreground")}
                onClick={() => toggleComplete(item.id)}
              >
                <Check className="mr-1 h-4 w-4" />
                {item.completed ? "Completed" : "Mark Complete"}
              </Button>
              <div className="flex space-x-1">
                <Button variant="ghost" size="icon" onClick={() => openEditDialog(item)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => deleteItem(item.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Bucket List Item</DialogTitle>
            <DialogDescription>Update the details of your bucket list item</DialogDescription>
          </DialogHeader>

          {editItem && (
            <div className="space-y-4 py-2">
              <div className="grid gap-2">
                <Label htmlFor="edit-title">Title</Label>
                <Input
                  id="edit-title"
                  value={editItem.title}
                  onChange={(e) => setEditItem({ ...editItem, title: e.target.value })}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={editItem.description}
                  onChange={(e) => setEditItem({ ...editItem, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="grid gap-2">
                <Label>Target Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "justify-start text-left font-normal w-full",
                        !editItem.targetDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {editItem.targetDate ? format(editItem.targetDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={editItem.targetDate}
                      onSelect={(date) => setEditItem({ ...editItem, targetDate: date })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="grid gap-2">
                <Label>Category</Label>
                <Select
                  value={editItem.category}
                  onValueChange={(value) => setEditItem({ ...editItem, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="travel">Travel</SelectItem>
                    <SelectItem value="skill">Skill</SelectItem>
                    <SelectItem value="fitness">Fitness</SelectItem>
                    <SelectItem value="creative">Creative</SelectItem>
                    <SelectItem value="career">Career</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

