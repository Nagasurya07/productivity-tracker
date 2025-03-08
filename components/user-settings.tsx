"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Cloud, CreditCard, Globe, Lock, Mail, Save, User } from "lucide-react"
import { useTheme } from "next-themes"

export default function UserSettings() {
  const { theme, setTheme } = useTheme()

  const [profile, setProfile] = useState({
    name: "Jane Doe",
    email: "jane.doe@example.com",
    bio: "I'm a software engineer passionate about productivity and health.",
    avatar: "/placeholder.svg?height=100&width=100",
  })

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    taskReminders: true,
    habitReminders: true,
    weeklyReport: true,
    marketingEmails: false,
  })

  const [preferences, setPreferences] = useState({
    theme: theme || "system",
    calorieTarget: "2200",
    weeklyTaskGoal: "25",
    startOfWeek: "monday",
    timeFormat: "12h",
  })

  const handleProfileChange = (field: string, value: string) => {
    setProfile({ ...profile, [field]: value })
  }

  const handleNotificationChange = (field: string, value: boolean) => {
    setNotifications({ ...notifications, [field]: value })
  }

  const handlePreferenceChange = (field: string, value: string) => {
    if (field === "theme") {
      setTheme(value)
    }
    setPreferences({ ...preferences, [field]: value })
  }

  const saveSettings = () => {
    // In a real app, this would save to a backend
    console.log("Settings saved:", { profile, notifications, preferences })
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>Profile</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span>Preferences</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4 items-start">
                <div className="flex flex-col items-center space-y-2">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={profile.avatar} />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm">
                    Change Avatar
                  </Button>
                </div>

                <div className="flex-1 space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => handleProfileChange("name", e.target.value)}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => handleProfileChange("email", e.target.value)}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Input id="bio" value={profile.bio} onChange={(e) => handleProfileChange("bio", e.target.value)} />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={saveSettings} className="ml-auto">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account Security</CardTitle>
              <CardDescription>Manage your password and security settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-medium">Two-Factor Authentication</div>
                  <div className="text-sm text-muted-foreground">Add an extra layer of security</div>
                </div>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Enable
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={saveSettings} className="ml-auto">
                <Save className="mr-2 h-4 w-4" />
                Update Security
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Choose how you want to be notified</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Notification Channels</h3>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>Email Notifications</span>
                    </div>
                    <div className="text-sm text-muted-foreground">Receive notifications via email</div>
                  </div>
                  <Switch
                    checked={notifications.email}
                    onCheckedChange={(checked) => handleNotificationChange("email", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Bell className="h-4 w-4 text-muted-foreground" />
                      <span>Push Notifications</span>
                    </div>
                    <div className="text-sm text-muted-foreground">Receive notifications in your browser</div>
                  </div>
                  <Switch
                    checked={notifications.push}
                    onCheckedChange={(checked) => handleNotificationChange("push", checked)}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Notification Types</h3>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span>Task Reminders</span>
                    <div className="text-sm text-muted-foreground">Get reminded about upcoming tasks</div>
                  </div>
                  <Switch
                    checked={notifications.taskReminders}
                    onCheckedChange={(checked) => handleNotificationChange("taskReminders", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span>Habit Reminders</span>
                    <div className="text-sm text-muted-foreground">Get reminded to complete your habits</div>
                  </div>
                  <Switch
                    checked={notifications.habitReminders}
                    onCheckedChange={(checked) => handleNotificationChange("habitReminders", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span>Weekly Progress Report</span>
                    <div className="text-sm text-muted-foreground">Receive a summary of your weekly progress</div>
                  </div>
                  <Switch
                    checked={notifications.weeklyReport}
                    onCheckedChange={(checked) => handleNotificationChange("weeklyReport", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span>Marketing Emails</span>
                    <div className="text-sm text-muted-foreground">Receive updates about new features</div>
                  </div>
                  <Switch
                    checked={notifications.marketingEmails}
                    onCheckedChange={(checked) => handleNotificationChange("marketingEmails", checked)}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={saveSettings} className="ml-auto">
                <Save className="mr-2 h-4 w-4" />
                Save Preferences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>App Preferences</CardTitle>
              <CardDescription>Customize your app experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Appearance</h3>

                <div className="grid gap-2">
                  <Label htmlFor="theme">Theme</Label>
                  <Select value={preferences.theme} onValueChange={(value) => handlePreferenceChange("theme", value)}>
                    <SelectTrigger id="theme">
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Health & Productivity Goals</h3>

                <div className="grid gap-2">
                  <Label htmlFor="calorie-target">Daily Calorie Target</Label>
                  <Input
                    id="calorie-target"
                    type="number"
                    value={preferences.calorieTarget}
                    onChange={(e) => handlePreferenceChange("calorieTarget", e.target.value)}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="task-goal">Weekly Task Goal</Label>
                  <Input
                    id="task-goal"
                    type="number"
                    value={preferences.weeklyTaskGoal}
                    onChange={(e) => handlePreferenceChange("weeklyTaskGoal", e.target.value)}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Regional Settings</h3>

                <div className="grid gap-2">
                  <Label htmlFor="start-of-week">Start of Week</Label>
                  <Select
                    value={preferences.startOfWeek}
                    onValueChange={(value) => handlePreferenceChange("startOfWeek", value)}
                  >
                    <SelectTrigger id="start-of-week">
                      <SelectValue placeholder="Select start of week" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monday">Monday</SelectItem>
                      <SelectItem value="sunday">Sunday</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="time-format">Time Format</Label>
                  <Select
                    value={preferences.timeFormat}
                    onValueChange={(value) => handlePreferenceChange("timeFormat", value)}
                  >
                    <SelectTrigger id="time-format">
                      <SelectValue placeholder="Select time format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12h">12-hour (AM/PM)</SelectItem>
                      <SelectItem value="24h">24-hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Data & Privacy</h3>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Cloud className="h-4 w-4 text-muted-foreground" />
                      <span>Cloud Sync</span>
                    </div>
                    <div className="text-sm text-muted-foreground">Sync your data across devices</div>
                  </div>
                  <Switch checked={true} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-muted-foreground" />
                      <span>Usage Analytics</span>
                    </div>
                    <div className="text-sm text-muted-foreground">Help us improve by sharing anonymous usage data</div>
                  </div>
                  <Switch checked={true} />
                </div>

                <div className="pt-2">
                  <Button variant="outline" className="w-full">
                    Export Your Data
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={saveSettings} className="ml-auto">
                <Save className="mr-2 h-4 w-4" />
                Save Preferences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

