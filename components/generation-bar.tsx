"use client"

import { useState } from "react"
import { ArrowUp, ChevronUp, ImageIcon, Video, Mic, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function GenerationBar() {
  const [prompt, setPrompt] = useState("")
  const [mode, setMode] = useState("Image")
  const [isGenerating, setIsGenerating] = useState(false)

  const modes = [
    { name: "Image", icon: ImageIcon },
    { name: "Video", icon: Video },
    { name: "Voice", icon: Mic },
  ]

  const handleGenerate = () => {
    if (!prompt.trim()) return
    setIsGenerating(true)
    // Simulate generation
    setTimeout(() => setIsGenerating(false), 3000)
  }

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 ml-32">
      <div className="bg-black/80 backdrop-blur-md border border-[#333333] rounded-full px-6 py-4 flex items-center gap-4 min-w-[600px]">
        <Textarea
          placeholder="Describe what you want to create..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="flex-1 bg-transparent border-none resize-none text-white placeholder:text-[#A1A1A1] text-[15px] min-h-[24px] max-h-[120px] focus-visible:ring-0"
          rows={1}
        />

        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10 p-2"
          onClick={() => {
            // Toggle between compact and expanded sizes
            // This could toggle a state that changes the min-w-[600px] to min-w-[800px] or similar
          }}
        >
          <Maximize2 className="h-4 w-4" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 flex items-center gap-2">
              {(() => {
                const currentMode = modes.find((m) => m.name === mode)
                const IconComponent = currentMode?.icon
                return IconComponent ? <IconComponent className="h-4 w-4" /> : null
              })()}
              {mode}
              <ChevronUp className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" className="bg-[#111111] border-[#333333]">
            {modes.map((modeOption) => (
              <DropdownMenuItem
                key={modeOption.name}
                onClick={() => setMode(modeOption.name)}
                className="text-white hover:bg-white/10 flex items-center gap-2"
              >
                <modeOption.icon className="h-4 w-4" />
                {modeOption.name} Generation
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          onClick={handleGenerate}
          disabled={!prompt.trim() || isGenerating}
          className="bg-white text-black hover:bg-white/90 rounded-full w-10 h-10 p-0"
        >
          {isGenerating ? (
            <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
          ) : (
            <ArrowUp className="h-5 w-5" />
          )}
        </Button>
      </div>
    </div>
  )
}
