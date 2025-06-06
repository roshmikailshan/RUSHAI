"use client"

import type React from "react"

import { MobileHeader } from "./mobile-header"
import { MobileFooter } from "./mobile-footer"

interface MobileLayoutProps {
  children: React.ReactNode
}

export function MobileLayout({ children }: MobileLayoutProps) {
  return (
    <div className="min-h-screen bg-black text-white w-full">
      <MobileHeader />
      <main className="pt-14 pb-16 w-full">{children}</main>
      <MobileFooter />
    </div>
  )
}
