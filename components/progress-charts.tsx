"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { Bar, BarChart, CartesianGrid, Line, LineChart, Pie, PieChart, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export default function ProgressCharts() {
  const [timeframe, setTimeframe] = useState("weekly")

  // Sample data for charts
  const taskCompletionData = [
    { day: "Mon", completed: 5, total: 8 },
    { day: "Tue", completed: 7, total: 9 },
    { day: "Wed", completed: 4, total: 6 },
    { day: "Thu", completed: 6, total: 7 },
    { day: "Fri", completed: 8, total: 10 },
    { day: "Sat", completed: 3, total: 5 },
    { day: "Sun", completed: 2, total: 4 },
  ]

  const calorieData = [
    { day: "Mon", calories: 1950, target: 2200 },
    { day: "Tue", calories: 2100, target: 2200 },
    { day: "Wed", calories: 1850, target: 2200 },
    { day: "Thu", calories: 2300, target: 2200 },
    { day: "Fri", calories: 2050, target: 2200 },
    { day: "Sat", calories: 2400, target: 2200 },
    { day: "Sun", calories: 1800, target: 2200 },
  ]

  const bucketListData = [
    { name: "Completed", value: 3, color: "hsl(var(--chart-1))" },
    { name: "In Progress", value: 2, color: "hsl(var(--chart-2))" },
    { name: "Not Started", value: 5, color: "hsl(var(--chart-3))" },
  ]

  const monthlyTaskData = [
    { month: "Jan", completed: 45, total: 60 },
    { month: "Feb", completed: 52, total: 65 },
    { month: "Mar", completed: 48, total: 62 },
    { month: "Apr", completed: 61, total: 75 },
    { month: "May", completed: 55, total: 68 },
    { month: "Jun", completed: 67, total: 80 },
  ]

  const monthlyCalorieData = [
    { month: "Jan", calories: 2050, target: 2200 },
    { month: "Feb", calories: 2150, target: 2200 },
    { month: "Mar", calories: 2100, target: 2200 },
    { month: "Apr", calories: 2000, target: 2200 },
    { month: "May", calories: 2250, target: 2200 },
    { month: "Jun", calories: 2150, target: 2200 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Progress Visualization</h2>
        <Select value={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="tasks" className="space-y-4">
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="tasks">Task Completion</TabsTrigger>
          <TabsTrigger value="calories">Calorie Tracking</TabsTrigger>
          <TabsTrigger value="bucket-list">Bucket List</TabsTrigger>
        </TabsList>

        <TabsContent value="tasks" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-semibold">Task Completion Rate</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                {timeframe === "weekly"
                  ? "Your task completion for the past week"
                  : timeframe === "monthly"
                    ? "Your task completion over the past 6 months"
                    : "Your task completion for today"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px] w-full">
                {timeframe === "weekly" ? (
                  <ChartContainer
                    config={{
                      completed: {
                        label: "Completed Tasks",
                        color: "hsl(var(--chart-1))",
                      },
                      total: {
                        label: "Total Tasks",
                        color: "hsl(var(--chart-2))",
                      },
                    }}
                  >
                    <BarChart
                      data={taskCompletionData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 30,
                        bottom: 20,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted-foreground))" opacity={0.2} />
                      <XAxis 
                        dataKey="day" 
                        stroke="hsl(var(--foreground))"
                        fontSize={12}
                        tickLine={false}
                      />
                      <YAxis 
                        stroke="hsl(var(--foreground))"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <ChartTooltip 
                        content={<ChartTooltipContent />}
                        cursor={{ fill: 'hsl(var(--muted))' }}
                      />
                      <Bar 
                        dataKey="completed" 
                        fill="hsl(var(--primary))" 
                        radius={[4, 4, 0, 0]}
                        maxBarSize={50}
                      />
                      <Bar 
                        dataKey="total" 
                        fill="hsl(var(--muted))" 
                        radius={[4, 4, 0, 0]}
                        maxBarSize={50}
                      />
                    </BarChart>
                  </ChartContainer>
                ) : timeframe === "monthly" ? (
                  <ChartContainer
                    config={{
                      completed: {
                        label: "Completed Tasks",
                        color: "hsl(var(--chart-1))",
                      },
                      total: {
                        label: "Total Tasks",
                        color: "hsl(var(--chart-2))",
                      },
                    }}
                  >
                    <LineChart
                      data={monthlyTaskData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="completed" stroke="var(--color-completed)" strokeWidth={2} />
                      <Line type="monotone" dataKey="total" stroke="var(--color-total)" strokeWidth={2} />
                    </LineChart>
                  </ChartContainer>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-muted-foreground">Daily task breakdown not available</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Task Completion Stats</CardTitle>
                <CardDescription>Summary of your productivity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Tasks Completed Today</span>
                    <span className="text-sm">5/8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Weekly Completion Rate</span>
                    <span className="text-sm">72%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Most Productive Day</span>
                    <span className="text-sm">Friday</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Least Productive Day</span>
                    <span className="text-sm">Sunday</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Task Categories</CardTitle>
                <CardDescription>Distribution by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Work</span>
                    <span className="text-sm">42%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Personal</span>
                    <span className="text-sm">28%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Health</span>
                    <span className="text-sm">15%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Errands</span>
                    <span className="text-sm">15%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="calories" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Calorie Intake</CardTitle>
              <CardDescription>
                {timeframe === "weekly"
                  ? "Your calorie intake for the past week"
                  : timeframe === "monthly"
                    ? "Your calorie intake over the past 6 months"
                    : "Your calorie intake for today"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                {timeframe === "weekly" ? (
                  <ChartContainer
                    config={{
                      calories: {
                        label: "Calories Consumed",
                        color: "hsl(var(--chart-1))",
                      },
                      target: {
                        label: "Target Calories",
                        color: "hsl(var(--chart-2))",
                      },
                    }}
                  >
                    <LineChart
                      data={calorieData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="calories" stroke="var(--color-calories)" strokeWidth={2} />
                      <Line
                        type="monotone"
                        dataKey="target"
                        stroke="var(--color-target)"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                      />
                    </LineChart>
                  </ChartContainer>
                ) : timeframe === "monthly" ? (
                  <ChartContainer
                    config={{
                      calories: {
                        label: "Calories Consumed",
                        color: "hsl(var(--chart-1))",
                      },
                      target: {
                        label: "Target Calories",
                        color: "hsl(var(--chart-2))",
                      },
                    }}
                  >
                    <LineChart
                      data={monthlyCalorieData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="calories" stroke="var(--color-calories)" strokeWidth={2} />
                      <Line
                        type="monotone"
                        dataKey="target"
                        stroke="var(--color-target)"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                      />
                    </LineChart>
                  </ChartContainer>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-muted-foreground">Daily calorie breakdown not available</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Calorie Stats</CardTitle>
                <CardDescription>Summary of your calorie intake</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Average Daily Intake</span>
                    <span className="text-sm">2,050 cal</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Days Under Target</span>
                    <span className="text-sm">4/7</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Highest Intake Day</span>
                    <span className="text-sm">Saturday (2,400 cal)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Lowest Intake Day</span>
                    <span className="text-sm">Sunday (1,800 cal)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Meal Distribution</CardTitle>
                <CardDescription>Calories by meal type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Breakfast</span>
                    <span className="text-sm">25%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Lunch</span>
                    <span className="text-sm">30%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Dinner</span>
                    <span className="text-sm">35%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Snacks</span>
                    <span className="text-sm">10%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="bucket-list" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Bucket List Progress</CardTitle>
              <CardDescription>Status of your bucket list goals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                <ChartContainer
                  config={{
                    Completed: {
                      label: "Completed",
                      color: "hsl(var(--chart-1))",
                    },
                    "In Progress": {
                      label: "In Progress",
                      color: "hsl(var(--chart-2))",
                    },
                    "Not Started": {
                      label: "Not Started",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                >
                  <PieChart>
                    <Pie
                      data={bucketListData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Bucket List Stats</CardTitle>
                <CardDescription>Summary of your life goals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Total Goals</span>
                    <span className="text-sm">10</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Completion Rate</span>
                    <span className="text-sm">30%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Goals Due This Year</span>
                    <span className="text-sm">4</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Recently Added</span>
                    <span className="text-sm">2 in last month</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Category Distribution</CardTitle>
                <CardDescription>Goals by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Travel</span>
                    <span className="text-sm">40%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Skill</span>
                    <span className="text-sm">20%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Fitness</span>
                    <span className="text-sm">20%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Creative</span>
                    <span className="text-sm">20%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

