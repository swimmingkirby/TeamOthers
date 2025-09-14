"use client"

import * as React from "react"
import Link from "next/link"
import { Menu } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const navigationItems = [
  { name: "Home", href: "#home" },
  { name: "UK Winter Barley", href: "#uk-winter-barley" },
  { name: "Fertiliser Usage", href: "#fertiliser-usage" },
  { name: "Weather", href: "#weather" },
  { name: "Insect Populations", href: "#insect-populations" },
  { name: "Asia", href: "#asia" },
  { name: "Africa", href: "#africa" },
  { name: "Global", href: "#global-implications" },
  { name: "Future", href: "#future" },
  { name: "References", href: "#references" },
]

const Navigation = () => {
  const [open, setOpen] = React.useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="font-serif text-xl font-bold text-foreground hover:text-primary transition-colors">
              NPK Impact Explorer
            </Link>
          </div>

          {/* Desktop Navigation - All buttons visible */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Button key={item.name} variant="ghost" size="sm" asChild>
                <Link
                  href={item.href}
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  {item.name}
                </Link>
              </Button>
            ))}
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle className="font-serif text-left">NPK Impact Explorer</SheetTitle>
                  <SheetDescription className="text-left">
                    Navigate through the sections
                  </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-6">
                  {navigationItems.map((item) => (
                    <Button key={item.name} variant="ghost" className="justify-start" asChild>
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="text-lg font-medium"
                      >
                        {item.name}
                      </Link>
                    </Button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation