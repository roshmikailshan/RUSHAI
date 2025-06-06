"use client"

import { useState } from "react"
import { Filter, Bell, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function Header() {
  const [pageTitle] = useState("Explore")

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4">
      <div className="flex items-center gap-6">
        <div className="text-xl font-semibold">GenAI</div>
        <h1 className="text-[28px] font-semibold">{pageTitle}</h1>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
          <Filter className="h-5 w-5" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <Bell className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-[#111111] border-[#333333]">
            <DropdownMenuItem className="text-white hover:bg-white/10">User X liked your image</DropdownMenuItem>
            <DropdownMenuItem className="text-white hover:bg-white/10">
              Your voice training is complete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <User className="h-4 w-4" />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-[#111111] border-[#333333]">
            <DropdownMenuItem className="text-white hover:bg-white/10">Settings</DropdownMenuItem>
            <DropdownMenuItem className="text-white hover:bg-white/10">Billing</DropdownMenuItem>
            <DropdownMenuItem className="text-white hover:bg-white/10">Log Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
