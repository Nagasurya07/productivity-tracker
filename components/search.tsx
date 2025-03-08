"use client"

import { useState } from "react"
import { SearchIcon, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

type SearchResult = {
  id: string
  title: string
  description: string
  type: "task" | "bucket-list" | "calorie" | "habit"
  date?: string
}

export function Search({ fullPage = false }: { fullPage?: boolean }) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  // Mock search results
  const allResults: SearchResult[] = [
    {
      id: "1",
      title: "Complete project proposal",
      description: "High priority task due soon",
      type: "task",
      date: "Mar 15, 2025",
    },
    { id: "2", title: "Morning workout", description: "Daily exercise routine", type: "task", date: "Today" },
    {
      id: "3",
      title: "Visit Japan",
      description: "Bucket list travel goal",
      type: "bucket-list",
      date: "Apr 15, 2025",
    },
    {
      id: "4",
      title: "Learn guitar",
      description: "Skill development goal",
      type: "bucket-list",
      date: "Dec 31, 2025",
    },
    { id: "5", title: "Oatmeal with berries", description: "350 calories - Breakfast", type: "calorie", date: "Today" },
    { id: "6", title: "Meditation", description: "7-day streak", type: "habit", date: "Daily" },
    { id: "7", title: "Reading", description: "3-day streak", type: "habit", date: "Daily" },
  ]

  const filteredResults =
    query.length > 0
      ? allResults.filter(
          (result) =>
            result.title.toLowerCase().includes(query.toLowerCase()) ||
            result.description.toLowerCase().includes(query.toLowerCase()),
        )
      : []

  const filteredByType =
    activeTab === "all" ? filteredResults : filteredResults.filter((result) => result.type === activeTab)

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "task":
        return "📝"
      case "bucket-list":
        return "🌟"
      case "calorie":
        return "🍎"
      case "habit":
        return "🔄"
      default:
        return "📄"
    }
  }

  if (fullPage) {
    return (
      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search tasks, goals, habits..."
                className="pl-8"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>

          {query.length > 0 && (
            <div className="space-y-4">
              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="task">Tasks</TabsTrigger>
                  <TabsTrigger value="bucket-list">Bucket List</TabsTrigger>
                  <TabsTrigger value="calorie">Calories</TabsTrigger>
                  <TabsTrigger value="habit">Habits</TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="space-y-2">
                {filteredByType.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">No results found for "{query}"</div>
                ) : (
                  filteredByType.map((result) => (
                    <div
                      key={result.id}
                      className="flex items-start p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      <div className="mr-3 text-xl">{getTypeIcon(result.type)}</div>
                      <div className="flex-1">
                        <div className="font-medium">{result.title}</div>
                        <div className="text-sm text-muted-foreground">{result.description}</div>
                      </div>
                      {result.date && <div className="text-xs text-muted-foreground">{result.date}</div>}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Button variant="outline" size="icon" className="hidden md:flex" onClick={() => setIsOpen(true)}>
        <SearchIcon className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Search</span>
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
          <div className="fixed left-[50%] top-[20%] z-50 grid w-full max-w-lg translate-x-[-50%] gap-4 border bg-background p-6 shadow-lg sm:rounded-lg">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Search</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="relative">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search tasks, goals, habits..."
                className="pl-8"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
              />
            </div>

            {query.length > 0 && (
              <div className="space-y-4">
                <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="task">Tasks</TabsTrigger>
                    <TabsTrigger value="bucket-list">Bucket List</TabsTrigger>
                    <TabsTrigger value="calorie">Calories</TabsTrigger>
                    <TabsTrigger value="habit">Habits</TabsTrigger>
                  </TabsList>
                </Tabs>

                <div className="space-y-2 max-h-[300px] overflow-y-auto">
                  {filteredByType.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">No results found for "{query}"</div>
                  ) : (
                    filteredByType.map((result) => (
                      <div
                        key={result.id}
                        className="flex items-start p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                      >
                        <div className="mr-3 text-xl">{getTypeIcon(result.type)}</div>
                        <div className="flex-1">
                          <div className="font-medium">{result.title}</div>
                          <div className="text-sm text-muted-foreground">{result.description}</div>
                        </div>
                        {result.date && <div className="text-xs text-muted-foreground">{result.date}</div>}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

