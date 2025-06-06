"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "./header"
import { Sidebar } from "./sidebar"
import { GenerationBar } from "./generation-bar"
import { SearchModal } from "./search-modal"

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <div className="min-h-screen bg-black text-white font-inter">
      <Header />
      <div className="flex">
        <Sidebar onSearchClick={() => setIsSearchOpen(true)} />
        <main className="flex-1 ml-64 pt-16 pb-32">{children}</main>
      </div>
      <GenerationBar />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  )
}
