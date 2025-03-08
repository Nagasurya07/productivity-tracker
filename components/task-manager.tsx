"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Clock, Plus, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Task = {
  id: string
  title: string
  completed: boolean
  dueDate: Date | undefined
  priority: "low" | "medium" | "high"
  category: string
}

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Complete project proposal",
      completed: false,
      dueDate: new Date(2025, 2, 15),
      priority: "high",
      category: "work",
    },
    {
      id: "2",
      title: "Morning workout",
      completed: true,
      dueDate: new Date(2025, 2, 8),
      priority: "medium",
      category: "health",
    },
    {
      id: "3",
      title: "Read 30 pages",
      completed: false,
      dueDate: new Date(2025, 2, 8),
      priority: "low",
      category: "personal",
    },
    {
      id: "4",
      title: "Grocery shopping",
      completed: false,
      dueDate: new Date(2025, 2, 9),
      priority: "medium",
      category: "errands",
    },
    {
      id: "5",
      title: "Call mom",
      completed: false,
      dueDate: new Date(2025, 2, 10),
      priority: "medium",
      category: "personal",
    },
  ])

  const [newTask, setNewTask] = useState("")
  const [date, setDate] = useState<Date>()
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium")
  const [category, setCategory] = useState("personal")

  const addTask = () => {
    if (newTask.trim() === "") return

    const task: Task = {
      id: Date.now().toString(),
      title: newTask,
      completed: false,
      dueDate: date,
      priority,
      category,
    }

    setTasks([...tasks, task])
    setNewTask("")
    setDate(undefined)
    setPriority("medium")
    setCategory("personal")
  }

  const toggleTask = (id: string) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-500"
      case "medium":
        return "text-amber-500"
      case "low":
        return "text-green-500"
      default:
        return ""
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "work":
        return "bg-blue-100 text-blue-800"
      case "personal":
        return "bg-purple-100 text-purple-800"
      case "health":
        return "bg-green-100 text-green-800"
      case "errands":
        return "bg-amber-100 text-amber-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Add New Task</CardTitle>
          <CardDescription>Create a new task with details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="task">Task Title</Label>
            <Input
              id="task"
              placeholder="Enter task title"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") addTask()
              }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="grid gap-2">
              <Label>Due Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid gap-2">
              <Label>Priority</Label>
              <Select value={priority} onValueChange={(value: any) => setPriority(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="work">Work</SelectItem>
                  <SelectItem value="personal">Personal</SelectItem>
                  <SelectItem value="health">Health</SelectItem>
                  <SelectItem value="errands">Errands</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={addTask} className="w-full">
            <Plus className="mr-2 h-4 w-4" /> Add Task
          </Button>
        </CardFooter>
      </Card>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {tasks.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No tasks yet. Add your first task above!</div>
          ) : (
            tasks.map((task) => (
              <Card key={task.id} className={cn("transition-all", task.completed && "opacity-60")}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id={`task-${task.id}`}
                        checked={task.completed}
                        onCheckedChange={() => toggleTask(task.id)}
                        className="mt-1"
                      />
                      <div className="space-y-1">
                        <Label
                          htmlFor={`task-${task.id}`}
                          className={cn("text-base font-medium", task.completed && "line-through")}
                        >
                          {task.title}
                        </Label>
                        <div className="flex flex-wrap gap-2 items-center text-sm text-muted-foreground">
                          {task.dueDate && (
                            <div className="flex items-center">
                              <Clock className="mr-1 h-3 w-3" />
                              {format(task.dueDate, "MMM d, yyyy")}
                            </div>
                          )}
                          <div className={getPriorityColor(task.priority)}>
                            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                          </div>
                          <div className={cn("px-2 py-0.5 rounded-full text-xs", getCategoryColor(task.category))}>
                            {task.category.charAt(0).toUpperCase() + task.category.slice(1)}
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => deleteTask(task.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="today" className="space-y-4">
          {/* Filter for today's tasks */}
          {tasks.filter((task) => task.dueDate && new Date(task.dueDate).toDateString() === new Date().toDateString())
            .length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No tasks due today.</div>
          ) : (
            tasks
              .filter((task) => task.dueDate && new Date(task.dueDate).toDateString() === new Date().toDateString())
              .map((task) => (
                <Card key={task.id} className={cn("transition-all", task.completed && "opacity-60")}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id={`task-${task.id}-today`}
                          checked={task.completed}
                          onCheckedChange={() => toggleTask(task.id)}
                          className="mt-1"
                        />
                        <div className="space-y-1">
                          <Label
                            htmlFor={`task-${task.id}-today`}
                            className={cn("text-base font-medium", task.completed && "line-through")}
                          >
                            {task.title}
                          </Label>
                          <div className="flex flex-wrap gap-2 items-center text-sm text-muted-foreground">
                            <div className={getPriorityColor(task.priority)}>
                              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                            </div>
                            <div className={cn("px-2 py-0.5 rounded-full text-xs", getCategoryColor(task.category))}>
                              {task.category.charAt(0).toUpperCase() + task.category.slice(1)}
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => deleteTask(task.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
          )}
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4">
          {/* Filter for upcoming tasks */}
          {tasks.filter(
            (task) =>
              task.dueDate &&
              new Date(task.dueDate) > new Date() &&
              new Date(task.dueDate).toDateString() !== new Date().toDateString(),
          ).length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No upcoming tasks.</div>
          ) : (
            tasks
              .filter(
                (task) =>
                  task.dueDate &&
                  new Date(task.dueDate) > new Date() &&
                  new Date(task.dueDate).toDateString() !== new Date().toDateString(),
              )
              .sort((a, b) => a.dueDate!.getTime() - b.dueDate!.getTime())
              .map((task) => (
                <Card key={task.id} className={cn("transition-all", task.completed && "opacity-60")}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id={`task-${task.id}-upcoming`}
                          checked={task.completed}
                          onCheckedChange={() => toggleTask(task.id)}
                          className="mt-1"
                        />
                        <div className="space-y-1">
                          <Label
                            htmlFor={`task-${task.id}-upcoming`}
                            className={cn("text-base font-medium", task.completed && "line-through")}
                          >
                            {task.title}
                          </Label>
                          <div className="flex flex-wrap gap-2 items-center text-sm text-muted-foreground">
                            {task.dueDate && (
                              <div className="flex items-center">
                                <Clock className="mr-1 h-3 w-3" />
                                {format(task.dueDate, "MMM d, yyyy")}
                              </div>
                            )}
                            <div className={getPriorityColor(task.priority)}>
                              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                            </div>
                            <div className={cn("px-2 py-0.5 rounded-full text-xs", getCategoryColor(task.category))}>
                              {task.category.charAt(0).toUpperCase() + task.category.slice(1)}
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => deleteTask(task.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {/* Filter for completed tasks */}
          {tasks.filter((task) => task.completed).length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No completed tasks yet.</div>
          ) : (
            tasks
              .filter((task) => task.completed)
              .map((task) => (
                <Card key={task.id} className="opacity-60">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id={`task-${task.id}-completed`}
                          checked={task.completed}
                          onCheckedChange={() => toggleTask(task.id)}
                          className="mt-1"
                        />
                        <div className="space-y-1">
                          <Label htmlFor={`task-${task.id}-completed`} className="text-base font-medium line-through">
                            {task.title}
                          </Label>
                          <div className="flex flex-wrap gap-2 items-center text-sm text-muted-foreground">
                            {task.dueDate && (
                              <div className="flex items-center">
                                <Clock className="mr-1 h-3 w-3" />
                                {format(task.dueDate, "MMM d, yyyy")}
                              </div>
                            )}
                            <div className={cn("px-2 py-0.5 rounded-full text-xs", getCategoryColor(task.category))}>
                              {task.category.charAt(0).toUpperCase() + task.category.slice(1)}
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => deleteTask(task.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

