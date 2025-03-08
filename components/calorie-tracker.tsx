"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Plus, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"

type FoodEntry = {
  id: string
  name: string
  calories: number
  date: Date
  mealType: "breakfast" | "lunch" | "dinner" | "snack"
}

export default function CalorieTracker() {
  const [entries, setEntries] = useState<FoodEntry[]>([
    { id: "1", name: "Oatmeal with berries", calories: 350, date: new Date(), mealType: "breakfast" },
    { id: "2", name: "Grilled chicken salad", calories: 450, date: new Date(), mealType: "lunch" },
    { id: "3", name: "Protein bar", calories: 200, date: new Date(), mealType: "snack" },
    { id: "4", name: "Salmon with vegetables", calories: 550, date: new Date(), mealType: "dinner" },
    { id: "5", name: "Greek yogurt", calories: 150, date: new Date(), mealType: "snack" },
  ])

  const [foodName, setFoodName] = useState("")
  const [calories, setCalories] = useState("")
  const [date, setDate] = useState<Date>(new Date())
  const [mealType, setMealType] = useState<"breakfast" | "lunch" | "dinner" | "snack">("breakfast")

  const addEntry = () => {
    if (foodName.trim() === "" || !calories) return

    const entry: FoodEntry = {
      id: Date.now().toString(),
      name: foodName,
      calories: Number.parseInt(calories),
      date: date || new Date(),
      mealType,
    }

    setEntries([...entries, entry])
    setFoodName("")
    setCalories("")
    setDate(new Date())
    setMealType("breakfast")
  }

  const deleteEntry = (id: string) => {
    setEntries(entries.filter((entry) => entry.id !== id))
  }

  const getTotalCalories = () => {
    return entries
      .filter((entry) => entry.date.toDateString() === new Date().toDateString())
      .reduce((total, entry) => total + entry.calories, 0)
  }

  const getCaloriesByMealType = (mealType: "breakfast" | "lunch" | "dinner" | "snack") => {
    return entries
      .filter((entry) => entry.date.toDateString() === new Date().toDateString() && entry.mealType === mealType)
      .reduce((total, entry) => total + entry.calories, 0)
  }

  const dailyCalorieTarget = 2200
  const totalCalories = getTotalCalories()
  const caloriesRemaining = dailyCalorieTarget - totalCalories
  const progressPercentage = Math.min(100, (totalCalories / dailyCalorieTarget) * 100)

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Daily Calorie Summary</CardTitle>
            <CardDescription>Today's calorie intake and targets</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Daily Target</span>
                <span className="font-medium">{dailyCalorieTarget} cal</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Consumed</span>
                <span className="font-medium">{totalCalories} cal</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Remaining</span>
                <span className={cn("font-medium", caloriesRemaining < 0 ? "text-red-500" : "text-green-500")}>
                  {caloriesRemaining} cal
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span className="font-medium">{Math.round(progressPercentage)}%</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className="border-dashed">
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-sm font-medium">Breakfast</div>
                    <div className="text-2xl font-bold mt-1">{getCaloriesByMealType("breakfast")}</div>
                    <div className="text-xs text-muted-foreground">calories</div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-dashed">
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-sm font-medium">Lunch</div>
                    <div className="text-2xl font-bold mt-1">{getCaloriesByMealType("lunch")}</div>
                    <div className="text-xs text-muted-foreground">calories</div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-dashed">
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-sm font-medium">Dinner</div>
                    <div className="text-2xl font-bold mt-1">{getCaloriesByMealType("dinner")}</div>
                    <div className="text-xs text-muted-foreground">calories</div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-dashed">
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-sm font-medium">Snacks</div>
                    <div className="text-2xl font-bold mt-1">{getCaloriesByMealType("snack")}</div>
                    <div className="text-xs text-muted-foreground">calories</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Add Food Entry</CardTitle>
            <CardDescription>Track what you eat and drink</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="food-name">Food Name</Label>
              <Input
                id="food-name"
                placeholder="Enter food name"
                value={foodName}
                onChange={(e) => setFoodName(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="calories">Calories</Label>
              <Input
                id="calories"
                type="number"
                placeholder="Enter calories"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Date</Label>
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
                <Label>Meal Type</Label>
                <Select value={mealType} onValueChange={(value: any) => setMealType(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select meal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="breakfast">Breakfast</SelectItem>
                    <SelectItem value="lunch">Lunch</SelectItem>
                    <SelectItem value="dinner">Dinner</SelectItem>
                    <SelectItem value="snack">Snack</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={addEntry} className="w-full">
              <Plus className="mr-2 h-4 w-4" /> Add Food Entry
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Food Log</CardTitle>
          <CardDescription>Your recent food entries</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="today" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="yesterday">Yesterday</TabsTrigger>
              <TabsTrigger value="all">All Entries</TabsTrigger>
            </TabsList>

            <TabsContent value="today" className="space-y-4">
              {entries.filter((entry) => entry.date.toDateString() === new Date().toDateString()).length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No food entries for today. Add your first meal above!
                </div>
              ) : (
                <div className="space-y-2">
                  {entries
                    .filter((entry) => entry.date.toDateString() === new Date().toDateString())
                    .map((entry) => (
                      <div key={entry.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div
                            className={cn(
                              "w-3 h-3 rounded-full",
                              entry.mealType === "breakfast"
                                ? "bg-blue-500"
                                : entry.mealType === "lunch"
                                  ? "bg-green-500"
                                  : entry.mealType === "dinner"
                                    ? "bg-purple-500"
                                    : "bg-amber-500",
                            )}
                          />
                          <div>
                            <div className="font-medium">{entry.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {entry.mealType.charAt(0).toUpperCase() + entry.mealType.slice(1)}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="font-medium">{entry.calories} cal</div>
                          <Button variant="ghost" size="icon" onClick={() => deleteEntry(entry.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="yesterday" className="space-y-4">
              <div className="text-center py-8 text-muted-foreground">No entries for yesterday.</div>
            </TabsContent>

            <TabsContent value="all" className="space-y-4">
              <div className="space-y-2">
                {entries.map((entry) => (
                  <div key={entry.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div
                        className={cn(
                          "w-3 h-3 rounded-full",
                          entry.mealType === "breakfast"
                            ? "bg-blue-500"
                            : entry.mealType === "lunch"
                              ? "bg-green-500"
                              : entry.mealType === "dinner"
                                ? "bg-purple-500"
                                : "bg-amber-500",
                        )}
                      />
                      <div>
                        <div className="font-medium">{entry.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {format(entry.date, "MMM d")} •{" "}
                          {entry.mealType.charAt(0).toUpperCase() + entry.mealType.slice(1)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="font-medium">{entry.calories} cal</div>
                      <Button variant="ghost" size="icon" onClick={() => deleteEntry(entry.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

