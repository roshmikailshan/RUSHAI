"use client"

import { useState } from "react"
import { Search, Plus, Heart, Upload, Trash2, Mic, Video, ImageIcon, Edit, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface SidebarProps {
  onSearchClick: () => void
}

export function Sidebar({ onSearchClick }: SidebarProps) {
  const [activeItem, setActiveItem] = useState("explore")
  const [folders] = useState(["Cat Images", "Dog Images", "Follower Images"])

  const navItems = [
    { id: "explore", label: "Explore", section: "discover" },
    { id: "image", label: "Image", section: "discover" },
    { id: "video", label: "Video", section: "discover" },
    { id: "voice", label: "Voice", section: "discover" },
    { id: "top", label: "Top", section: "discover" },
    { id: "liked", label: "Liked", section: "discover", icon: Heart },
    { id: "my-media", label: "My Media", section: "library" },
    { id: "favorites", label: "Favorites", section: "library" },
    { id: "uploads", label: "Uploads", section: "library", icon: Upload },
    { id: "trash", label: "Trash", section: "library", icon: Trash2 },
  ]

  const trainingItems = [
    { id: "image-training", label: "Image Training (Lora)", icon: ImageIcon },
    { id: "voice-training", label: "Voice Training (TTS)", icon: Mic },
    { id: "video-training", label: "Video Training (Coming Soon)", icon: Video, disabled: true },
  ]

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 bg-black border-r border-[#333333] p-4 overflow-y-auto">
      <div className="space-y-6">
        {/* Search */}
        <div className="relative">
          <Input
            placeholder="Search..."
            className="bg-[#111111] border-[#333333] text-white placeholder:text-[#A1A1A1] pr-10"
            onClick={onSearchClick}
            readOnly
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#A1A1A1]" />
        </div>

        {/* Discover Section */}
        <div>
          <h3 className="text-[13px] font-medium text-[#A1A1A1] uppercase tracking-wider mb-3">Discover</h3>
          <nav className="space-y-1">
            {navItems
              .filter((item) => item.section === "discover")
              .map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveItem(item.id)}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-md text-[14px] font-medium transition-colors flex items-center gap-3",
                    activeItem === item.id
                      ? "text-white bg-white/10"
                      : "text-[#A1A1A1] hover:text-white hover:bg-white/5",
                  )}
                >
                  {item.icon && <item.icon className="h-4 w-4" />}
                  {item.label}
                </button>
              ))}
          </nav>
        </div>

        {/* Library Section */}
        <div>
          <h3 className="text-[13px] font-medium text-[#A1A1A1] uppercase tracking-wider mb-3">Library</h3>
          <nav className="space-y-1">
            {navItems
              .filter((item) => item.section === "library")
              .map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveItem(item.id)}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-md text-[14px] font-medium transition-colors flex items-center gap-3",
                    activeItem === item.id
                      ? "text-white bg-white/10"
                      : "text-[#A1A1A1] hover:text-white hover:bg-white/5",
                  )}
                >
                  {item.icon && <item.icon className="h-4 w-4" />}
                  {item.label}
                </button>
              ))}
          </nav>
        </div>

        {/* Folders Section */}
        <div>
          <h3 className="text-[13px] font-medium text-[#A1A1A1] uppercase tracking-wider mb-3">Folders</h3>
          <div className="space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start text-[#A1A1A1] hover:text-white hover:bg-white/5 text-[14px] font-medium"
            >
              <Plus className="h-4 w-4 mr-3" />
              Create new folder
            </Button>
            {folders.map((folder) => (
              <div
                key={folder}
                className="group flex items-center justify-between w-full px-3 py-2 rounded-md text-[14px] font-medium text-[#A1A1A1] hover:text-white hover:bg-white/5 transition-colors"
              >
                <span className="flex-1 text-left">{folder}</span>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    className="p-1 hover:bg-white/10 rounded"
                    onClick={(e) => {
                      e.stopPropagation()
                      // Handle edit action
                    }}
                  >
                    <Edit className="h-3 w-3" />
                  </button>
                  <button
                    className="p-1 hover:bg-white/10 rounded text-red-400"
                    onClick={(e) => {
                      e.stopPropagation()
                      // Handle delete action
                    }}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Training Section */}
        <div>
          <h3 className="text-[13px] font-medium text-[#A1A1A1] uppercase tracking-wider mb-3">Training</h3>
          <nav className="space-y-1">
            {trainingItems.map((item) => (
              <button
                key={item.id}
                onClick={() => !item.disabled && setActiveItem(item.id)}
                className={cn(
                  "w-full text-left px-3 py-2 rounded-md text-[14px] font-medium transition-colors flex items-center gap-3",
                  item.disabled
                    ? "text-[#444444] cursor-not-allowed opacity-50"
                    : activeItem === item.id
                      ? "text-white bg-white/10"
                      : "text-[#A1A1A1] hover:text-white hover:bg-white/5",
                )}
                title={item.disabled ? "Coming Soon" : undefined}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  )
}
