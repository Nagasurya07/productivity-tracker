import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Dashboard from "@/components/dashboard"
import TaskManager from "@/components/task-manager"
import BucketList from "@/components/bucket-list"
import CalorieTracker from "@/components/calorie-tracker"
import ProgressCharts from "@/components/progress-charts"
import HabitTracker from "@/components/habit-tracker"
import Notifications from "@/components/notifications"
import UserSettings from "@/components/user-settings"
import { ModeToggle } from "@/components/mode-toggle"
import { Search } from "@/components/search"
import { Calendar, BarChartIcon as ChartBar, Cog, ListTodo, SearchIcon, Star, Utensils } from "lucide-react"

export default function Home() {
  return (
    <main className="container mx-auto p-4 md:p-6">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Productivity & Health Tracker</h1>
            <p className="text-muted-foreground">
              Manage tasks, track goals, monitor health metrics, and visualize your progress.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Search />
            <Notifications />
            <ModeToggle />
          </div>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-4">
          <TabsList className="grid grid-cols-2 md:grid-cols-8 h-auto">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden md:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="tasks" className="flex items-center gap-2">
              <ListTodo className="h-4 w-4" />
              <span className="hidden md:inline">Tasks</span>
            </TabsTrigger>
            <TabsTrigger value="bucket-list" className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              <span className="hidden md:inline">Bucket List</span>
            </TabsTrigger>
            <TabsTrigger value="calories" className="flex items-center gap-2">
              <Utensils className="h-4 w-4" />
              <span className="hidden md:inline">Calories</span>
            </TabsTrigger>
            <TabsTrigger value="habits" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden md:inline">Habits</span>
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex items-center gap-2">
              <ChartBar className="h-4 w-4" />
              <span className="hidden md:inline">Progress</span>
            </TabsTrigger>
            <TabsTrigger value="search" className="flex items-center gap-2 md:hidden">
              <SearchIcon className="h-4 w-4" />
              <span className="hidden md:inline">Search</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Cog className="h-4 w-4" />
              <span className="hidden md:inline">Settings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-4">
            <Dashboard />
          </TabsContent>

          <TabsContent value="tasks" className="space-y-4">
            <TaskManager />
          </TabsContent>

          <TabsContent value="bucket-list" className="space-y-4">
            <BucketList />
          </TabsContent>

          <TabsContent value="calories" className="space-y-4">
            <CalorieTracker />
          </TabsContent>

          <TabsContent value="habits" className="space-y-4">
            <HabitTracker />
          </TabsContent>

          <TabsContent value="progress" className="space-y-4">
            <ProgressCharts />
          </TabsContent>

          <TabsContent value="search" className="space-y-4 md:hidden">
            <Search fullPage />
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <UserSettings />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

