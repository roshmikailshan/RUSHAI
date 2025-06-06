"use client"

import { useState } from "react"
import { Heart, Bookmark, Download, Share } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"

export function ExplorePage() {
  const [selectedItem, setSelectedItem] = useState<any>(null)

  // Mock data for the grid
  const items = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    type: "image",
    url: `/placeholder.svg?height=${300 + (i % 3) * 100}&width=${250 + (i % 4) * 50}`,
    prompt: `A stunning ${["cyberpunk", "fantasy", "sci-fi", "nature"][i % 4]} scene with incredible detail and vibrant colors`,
    creator: {
      name: `Artist ${i + 1}`,
      avatar: `/placeholder.svg?height=32&width=32`,
    },
    likes: Math.floor(Math.random() * 1000) + 10,
    createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
  }))

  return (
    <div className="p-6">
      <div className="columns-3 gap-4 space-y-4">
        {items.map((item) => (
          <div key={item.id} className="break-inside-avoid group cursor-pointer" onClick={() => setSelectedItem(item)}>
            <div className="relative bg-[#111111] rounded-lg overflow-hidden">
              <img src={item.url || "/placeholder.svg"} alt={item.prompt} className="w-full h-auto object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={item.creator.avatar || "/placeholder.svg"}
                        alt={item.creator.name}
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-white text-[13px] font-medium">{item.creator.name}</span>
                    </div>
                    <div className="flex items-center gap-1 text-white text-[13px]">
                      <Heart className="h-3 w-3" />
                      {item.likes}
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 text-white hover:bg-white/20"
                  onClick={(e) => {
                    e.stopPropagation()
                    // Handle save action
                  }}
                >
                  <Bookmark className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail View Modal */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-6xl bg-[#111111] border-[#333333] p-0">
          {selectedItem && (
            <div className="grid grid-cols-1 lg:grid-cols-2 h-[80vh]">
              <div className="flex items-center justify-center bg-black p-4">
                <img
                  src={selectedItem.url || "/placeholder.svg"}
                  alt={selectedItem.prompt}
                  className="max-w-full max-h-full object-contain rounded-lg"
                />
              </div>
              <div className="p-6 flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <img
                    src={selectedItem.creator.avatar || "/placeholder.svg"}
                    alt={selectedItem.creator.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h3 className="text-white font-medium">{selectedItem.creator.name}</h3>
                    <p className="text-[#A1A1A1] text-[13px]">
                      {new Date(selectedItem.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-white font-medium mb-2">Prompt</h4>
                  <p className="text-[#A1A1A1] text-[15px] leading-relaxed">{selectedItem.prompt}</p>
                </div>

                <div className="flex gap-3 mt-auto">
                  <Button className="flex-1 bg-white text-black hover:bg-white/90">
                    <Heart className="h-4 w-4 mr-2" />
                    Like ({selectedItem.likes})
                  </Button>
                  <Button variant="outline" className="border-[#333333] text-white hover:bg-white/10">
                    <Share className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" className="border-[#333333] text-white hover:bg-white/10">
                    <Bookmark className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" className="border-[#333333] text-white hover:bg-white/10">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
