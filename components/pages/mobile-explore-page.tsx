"use client"

import { useState } from "react"
import { Heart, Clock, Search, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function MobileExplorePage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [items] = useState(
    Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      url: `/placeholder.svg?height=600&width=400`,
      likes: Math.floor(Math.random() * 1000) + 10,
      creator: `creator_${i + 1}`,
      prompt: `Amazing AI generated artwork ${i + 1}`,
    })),
  )

  const currentItem = items[currentIndex]

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
  }

  return (
    <div className="relative w-full h-[calc(100vh-7rem)] flex items-center justify-center bg-black">
      {/* Main Image */}
      <div className="relative w-full h-full flex items-center justify-center">
        <img
          src={currentItem.url || "/placeholder.svg"}
          alt={`Generated content by ${currentItem.creator}`}
          className="max-w-full max-h-full object-contain"
        />

        {/* Navigation Arrows */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 bg-black/30"
          onClick={prevImage}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 bg-black/30"
          onClick={nextImage}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>

        {/* Bottom Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-medium">{currentItem.creator}</span>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-1">
                <Search className="h-5 w-5 text-white" />
              </button>
              <button className="flex items-center gap-1">
                <Clock className="h-5 w-5 text-white" />
              </button>
              <button className="flex items-center gap-1">
                <Heart className="h-5 w-5 text-white" />
                <span className="text-white">{currentItem.likes}</span>
              </button>
            </div>
          </div>
          <p className="text-white/80 text-sm">{currentItem.prompt}</p>
        </div>

        {/* Image Counter */}
        <div className="absolute top-4 right-4 bg-black/50 rounded-full px-3 py-1">
          <span className="text-white text-sm">
            {currentIndex + 1} / {items.length}
          </span>
        </div>
      </div>
    </div>
  )
}
