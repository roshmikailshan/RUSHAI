"use client"

import { useState } from "react"
import { ChevronDown, Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function MobileHeader() {
  const [selectedOption, setSelectedOption] = useState("Explore")

  const navOptions = [
    { id: "explore", label: "Explore" },
    { id: "images", label: "Images" },
    { id: "videos", label: "Videos" },
    { id: "top", label: "Top" },
    { id: "likes", label: "Likes" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-black/90 backdrop-blur-md">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="text-white text-lg font-semibold flex items-center gap-1 px-1">
            {selectedOption}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-black/80 backdrop-blur-md border-[#333333] rounded-xl w-56 mt-1">
          {navOptions.map((option) => (
            <DropdownMenuItem
              key={option.id}
              className="flex items-center justify-between py-3 px-4 text-white hover:bg-white/10"
              onClick={() => setSelectedOption(option.label)}
            >
              <span>{option.label}</span>
              <div
                className={`w-5 h-5 rounded-full border border-white/40 flex items-center justify-center ${selectedOption === option.label ? "bg-white" : ""}`}
              >
                {selectedOption === option.label && <div className="w-2.5 h-2.5 rounded-full bg-black" />}
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
          <Filter className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
          <Search className="h-5 w-5" />
        </Button>
      </div>
    </header>
  )
}
