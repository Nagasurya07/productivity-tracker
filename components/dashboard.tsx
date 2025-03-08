"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, ListTodo, TrendingUp, Utensils } from "lucide-react"
import { useEffect, useState } from "react"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Dashboard() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle>
          <ListTodo className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">12/18</div>
          <p className="text-xs text-muted-foreground">+2 from yesterday</p>
          <Progress value={66} className="mt-3" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Bucket List Goals</CardTitle>
          <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">3/10</div>
          <p className="text-xs text-muted-foreground">1 upcoming this month</p>
          <Progress value={30} className="mt-3" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Calories Today</CardTitle>
          <Utensils className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">1,850</div>
          <p className="text-xs text-muted-foreground">350 below daily target</p>
          <Progress value={84} className="mt-3" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Weekly Progress</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+12%</div>
          <p className="text-xs text-muted-foreground">+4% from last week</p>
          <Progress value={progress} className="mt-3" />
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your activity from the past 24 hours</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { time: "9:30 AM", action: "Completed task: Morning workout", icon: "🏋️" },
              { time: "11:45 AM", action: "Added new bucket list item: Learn Spanish", icon: "🌍" },
              { time: "1:15 PM", action: "Logged lunch: 650 calories", icon: "🥗" },
              { time: "4:30 PM", action: "Completed task: Project presentation", icon: "📊" },
            ].map((item, i) => (
              <div key={i} className="flex items-center">
                <div className="mr-4 flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                  <span>{item.icon}</span>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">{item.action}</p>
                  <p className="text-sm text-muted-foreground">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Your Profile</CardTitle>
          <CardDescription>Manage your account and preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="/placeholder.svg?height=64&width=64" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h3 className="font-medium">Jane Doe</h3>
              <p className="text-sm text-muted-foreground">jane.doe@example.com</p>
              <div className="flex space-x-2 pt-2">
                <Button variant="outline" size="sm">
                  Edit Profile
                </Button>
                <Button size="sm">View Stats</Button>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex justify-between">
              <div className="text-sm font-medium">Daily Calorie Target</div>
              <div className="text-sm">2,200</div>
            </div>
            <div className="flex justify-between">
              <div className="text-sm font-medium">Weekly Task Goal</div>
              <div className="text-sm">25 tasks</div>
            </div>
            <div className="flex justify-between">
              <div className="text-sm font-medium">Bucket List Items</div>
              <div className="text-sm">10 items</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

