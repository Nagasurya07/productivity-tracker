"use client"

import { useState } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

type Notification = {
  id: string
  title: string
  description: string
  time: string
  read: boolean
  type: "task" | "bucket-list" | "calorie" | "habit" | "system"
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Task Due Soon",
      description: "Complete project proposal is due in 2 hours",
      time: "2 hours ago",
      read: false,
      type: "task",
    },
    {
      id: "2",
      title: "Calorie Goal Reached",
      description: "You've reached 80% of your daily calorie target",
      time: "4 hours ago",
      read: false,
      type: "calorie",
    },
    {
      id: "3",
      title: "Habit Streak",
      description: "You've maintained your meditation habit for 7 days!",
      time: "1 day ago",
      read: true,
      type: "habit",
    },
    {
      id: "4",
      title: "Bucket List Reminder",
      description: 'Your goal to "Learn Spanish" has a target date next month',
      time: "2 days ago",
      read: true,
      type: "bucket-list",
    },
    {
      id: "5",
      title: "System Update",
      description: "New features have been added to the tracker",
      time: "3 days ago",
      read: true,
      type: "system",
    },
  ])

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "task":
        return "📝"
      case "bucket-list":
        return "🌟"
      case "calorie":
        return "🍎"
      case "habit":
        return "🔄"
      case "system":
        return "⚙️"
      default:
        return "📣"
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-[1.2rem] w-[1.2rem]" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs text-destructive-foreground">
              {unreadCount}
            </span>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h4 className="font-medium">Notifications</h4>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          )}
        </div>
        <ScrollArea className="h-80">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-4 text-center">
              <Bell className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">No notifications yet</p>
            </div>
          ) : (
            <div className="divide-y">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "p-4 hover:bg-muted transition-colors cursor-pointer",
                    !notification.read && "bg-muted/50",
                  )}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-xl">{getNotificationIcon(notification.type)}</div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className={cn("text-sm font-medium", !notification.read && "font-semibold")}>
                          {notification.title}
                        </p>
                        <span className="text-xs text-muted-foreground">{notification.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{notification.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}

