"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Check, CheckCircle2, Clock, Plus, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { format, subDays, eachDayOfInterval } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"

type Habit = {
  id: string
  name: string
  description: string
  frequency: "daily" | "weekly" | "monthly"
  category: string
  streak: number
  completedDates: Date[]
}

export default function HabitTracker() {
  const today = new Date()
  const last30Days = eachDayOfInterval({
    start: subDays(today, 29),
    end: today,
  })

  const [habits, setHabits] = useState<Habit[]>([
    {
      id: "1",
      name: "Morning Meditation",
      description: "10 minutes of mindfulness meditation",
      frequency: "daily",
      category: "wellness",
      streak: 7,
      completedDates: last30Days.slice(-7),
    },
    {
      id: "2",
      name: "Read 30 pages",
      description: "Read at least 30 pages of a book",
      frequency: "daily",
      category: "personal",
      streak: 3,
      completedDates: last30Days.slice(-3),
    },
    {
      id: "3",
      name: "Drink 8 glasses of water",
      description: "Stay hydrated throughout the day",
      frequency: "daily",
      category: "health",
      streak: 5,
      completedDates: last30Days.slice(-5),
    },
    {
      id: "4",
      name: "Weekly meal prep",
      description: "Prepare meals for the week ahead",
      frequency: "weekly",
      category: "health",
      streak: 2,
      completedDates: [subDays(today, 7), today],
    },
  ])

  const [newHabit, setNewHabit] = useState("")
  const [newDescription, setNewDescription] = useState("")
  const [newFrequency, setNewFrequency] = useState<"daily" | "weekly" | "monthly">("daily")
  const [newCategory, setNewCategory] = useState("wellness")

  const addHabit = () => {
    if (newHabit.trim() === "") return

    const habit: Habit = {
      id: Date.now().toString(),
      name: newHabit,
      description: newDescription,
      frequency: newFrequency,
      category: newCategory,
      streak: 0,
      completedDates: [],
    }

    setHabits([...habits, habit])
    setNewHabit("")
    setNewDescription("")
    setNewFrequency("daily")
    setNewCategory("wellness")
  }

  const toggleHabitCompletion = (id: string) => {
    setHabits(
      habits.map((habit) => {
        if (habit.id === id) {
          const isCompletedToday = habit.completedDates.some((date) => date.toDateString() === today.toDateString())

          if (isCompletedToday) {
            // Remove today from completed dates and decrease streak
            return {
              ...habit,
              completedDates: habit.completedDates.filter((date) => date.toDateString() !== today.toDateString()),
              streak: Math.max(0, habit.streak - 1),
            }
          } else {
            // Add today to completed dates and increase streak
            return {
              ...habit,
              completedDates: [...habit.completedDates, new Date()],
              streak: habit.streak + 1,
            }
          }
        }
        return habit
      }),
    )
  }

  const deleteHabit = (id: string) => {
    setHabits(habits.filter((habit) => habit.id !== id))
  }

  const isHabitCompletedToday = (habit: Habit) => {
    return habit.completedDates.some((date) => date.toDateString() === today.toDateString())
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "wellness":
        return "bg-blue-100 text-blue-800"
      case "personal":
        return "bg-purple-100 text-purple-800"
      case "health":
        return "bg-green-100 text-green-800"
      case "work":
        return "bg-amber-100 text-amber-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getFrequencyText = (frequency: string) => {
    switch (frequency) {
      case "daily":
        return "Every day"
      case "weekly":
        return "Every week"
      case "monthly":
        return "Every month"
      default:
        return frequency
    }
  }

  const getCompletionRate = (habit: Habit) => {
    if (habit.frequency === "daily") {
      // For daily habits, check last 7 days
      const last7Days = 7
      const completedInLast7Days = habit.completedDates.filter((date) => date >= subDays(today, 6)).length

      return (completedInLast7Days / last7Days) * 100
    } else if (habit.frequency === "weekly") {
      // For weekly habits, check last 4 weeks
      const last4Weeks = 4
      const completedInLast4Weeks = habit.completedDates.filter((date) => date >= subDays(today, 28)).length

      return (completedInLast4Weeks / last4Weeks) * 100
    } else {
      // For monthly habits, check last 3 months
      const last3Months = 3
      const completedInLast3Months = habit.completedDates.filter((date) => date >= subDays(today, 90)).length

      return (completedInLast3Months / last3Months) * 100
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create New Habit</CardTitle>
          <CardDescription>Track recurring activities to build consistency</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="habit-name">Habit Name</Label>
            <Input
              id="habit-name"
              placeholder="Enter habit name"
              value={newHabit}
              onChange={(e) => setNewHabit(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="habit-description">Description (Optional)</Label>
            <Input
              id="habit-description"
              placeholder="Add details about this habit"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Frequency</Label>
              <Select value={newFrequency} onValueChange={(value: any) => setNewFrequency(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>Category</Label>
              <Select value={newCategory} onValueChange={setNewCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wellness">Wellness</SelectItem>
                  <SelectItem value="personal">Personal</SelectItem>
                  <SelectItem value="health">Health</SelectItem>
                  <SelectItem value="work">Work</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={addHabit} className="w-full">
            <Plus className="mr-2 h-4 w-4" /> Create Habit
          </Button>
        </CardFooter>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {habits.map((habit) => (
          <Card key={habit.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{habit.name}</CardTitle>
                  <CardDescription className="mt-1">{habit.description}</CardDescription>
                </div>
                <Badge variant="outline" className={cn("ml-2", getCategoryColor(habit.category))}>
                  {habit.category.charAt(0).toUpperCase() + habit.category.slice(1)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="mr-1 h-3 w-3" />
                    {getFrequencyText(habit.frequency)}
                  </div>
                  <div className="flex items-center font-medium">
                    <CheckCircle2 className="mr-1 h-3 w-3 text-green-500" />
                    {habit.streak} day streak
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Completion Rate</span>
                    <span>{Math.round(getCompletionRate(habit))}%</span>
                  </div>
                  <Progress value={getCompletionRate(habit)} className="h-2" />
                </div>

                <div className="flex flex-wrap gap-1 mt-2">
                  {last30Days.slice(-7).map((date, i) => {
                    const isCompleted = habit.completedDates.some(
                      (completedDate) => completedDate.toDateString() === date.toDateString(),
                    )
                    return (
                      <div
                        key={i}
                        className={cn(
                          "w-6 h-6 rounded-md flex items-center justify-center text-xs",
                          isCompleted
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                            : "bg-muted text-muted-foreground",
                        )}
                        title={format(date, "MMM d")}
                      >
                        {format(date, "d")}
                      </div>
                    )
                  })}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-2">
              <Button
                variant={isHabitCompletedToday(habit) ? "default" : "outline"}
                size="sm"
                className={cn(isHabitCompletedToday(habit) && "bg-green-600 hover:bg-green-700")}
                onClick={() => toggleHabitCompletion(habit.id)}
              >
                <Check className="mr-1 h-4 w-4" />
                {isHabitCompletedToday(habit) ? "Completed Today" : "Mark Complete"}
              </Button>
              <Button variant="ghost" size="icon" onClick={() => deleteHabit(habit.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

