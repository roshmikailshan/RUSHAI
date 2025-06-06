"use client"

import { useState } from "react"
import { Home, Calendar, PlusSquare, Bell, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { GenerationBar } from "./generation-bar"

export function MobileFooter() {
  const [showGenerationBar, setShowGenerationBar] = useState(false)

  const tabs = [
    { icon: Home, label: "Home", active: true },
    { icon: Calendar, label: "Feed" },
    { icon: PlusSquare, label: "Create" },
    { icon: Bell, label: "Notifications" },
    { icon: User, label: "Profile" },
  ]

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-t border-[#333333]">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => (
          <Button
            key={tab.label}
            variant="ghost"
            className={cn(
              "flex-1 flex flex-col items-center gap-1 py-3 rounded-none text-[#A1A1A1] hover:text-white hover:bg-transparent",
              tab.active && "text-white",
            )}
          >
            <tab.icon 
              className="h-6 w-6" 
              onClick={tab.label === "Create" ? () => setShowGenerationBar(true) : undefined}
            />
          </Button>
        ))}
      </div>
    </footer>
  \
  showGenerationBar && (
    <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm">
      <div
        className={`fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-md border-t border-[#333333] transform transition-transform duration-300 ease-out ${
          showGenerationBar ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white text-lg font-semibold">Create</h3>
            <button onClick={() => setShowGenerationBar(false)} className="text-white/60 hover:text-white">
              ✕
            </button>
          </div>
          <GenerationBar />
        </div>
      </div>
    </div>
  )
  \
  )\
}
