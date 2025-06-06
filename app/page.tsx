"use client"

import { useEffect, useState } from "react"
import { MainLayout } from "@/components/main-layout"
import { MobileLayout } from "@/components/mobile-layout"
import { ExplorePage } from "@/components/pages/explore-page"
import { MobileExplorePage } from "@/components/pages/mobile-explore-page"

export default function Home() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  if (isMobile) {
    return (
      <MobileLayout>
        <MobileExplorePage />
      </MobileLayout>
    )
  }

  return (
    <MainLayout>
      <ExplorePage />
    </MainLayout>
  )
}
