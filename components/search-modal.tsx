"use client"

import { useState } from "react"
import { Search, X, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const recentSearches = ["cyberpunk city", "fantasy landscape", "portrait art"]
  const trendingTags = ["#ai-art", "#digital-painting", "#concept-art", "#character-design"]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-black/95 backdrop-blur-md border-[#333333] p-0">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[20px] font-semibold">Search</h2>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/10">
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="relative mb-8">
            <Input
              placeholder="Search for images, videos, or creators..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#111111] border-[#333333] text-white placeholder:text-[#A1A1A1] text-[16px] py-4 pl-12 pr-4"
              autoFocus
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#A1A1A1]" />
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-[16px] font-medium mb-4">Recent Searches</h3>
              <div className="space-y-2">
                {recentSearches.map((search) => (
                  <button
                    key={search}
                    onClick={() => setSearchQuery(search)}
                    className="block w-full text-left px-3 py-2 rounded-md text-[#A1A1A1] hover:text-white hover:bg-white/5 transition-colors"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-[16px] font-medium mb-4 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Trending Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {trendingTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearchQuery(tag)}
                    className="px-3 py-1 rounded-full bg-[#111111] border border-[#333333] text-[#A1A1A1] hover:text-white hover:border-white/20 transition-colors text-[13px]"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
