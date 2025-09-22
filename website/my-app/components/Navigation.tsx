"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, BarChart3 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const navigationItems = [
  { name: "Analysis", href: "#two-decade" },
  { name: "Team", href: "#team" },
  { name: "UK Barley", href: "#uk-winter-barley" },
  { name: "Fertiliser", href: "#fertiliser-usage" },
  { name: "Global", href: "#global-implications" },
  { name: "Case Studies", href: "#global-case-studies" },
  { name: "Future", href: "#future" },
  { name: "Synthesis", href: "#synthesis" },
  { name: "References", href: "#references" },
]

const Navigation = () => {
  const [open, setOpen] = React.useState(false)
  const [activeSection, setActiveSection] = React.useState("")

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3, rootMargin: '-100px 0px -50% 0px' }
    )

    // Observe all sections
    navigationItems.forEach((item) => {
      const element = document.querySelector(item.href)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="font-serif text-xl font-bold text-primary hover:text-secondary transition-colors duration-300">
              NPK Impact Explorer
            </Link>
          </div>

          {/* Centered Navigation Container */}
          <div className="flex-1 flex justify-center">
            {/* Desktop Navigation - Full */}
            <div className="hidden xl:flex items-center space-x-1">
              {navigationItems.map((item) => {
                const sectionId = item.href.substring(1);
                const isActive = activeSection === sectionId;
                return (
                  <Button 
                    key={item.name} 
                    variant="ghost" 
                    size="sm" 
                    asChild 
                    className={`hover:bg-secondary/10 px-3 py-2 h-auto transition-all duration-300 ${
                      isActive ? 'bg-secondary/20 text-secondary' : ''
                    }`}
                  >
                    <Link
                      href={item.href}
                      className={`text-sm font-medium hover:text-secondary transition-colors duration-300 ${
                        isActive ? 'text-secondary' : ''
                      }`}
                    >
                      <span className="whitespace-nowrap">{item.name}</span>
                    </Link>
                  </Button>
                );
              })}
            </div>

            {/* Desktop Navigation - Compact */}
            <div className="hidden lg:flex xl:hidden items-center space-x-0.5">
              {navigationItems.map((item) => {
                const sectionId = item.href.substring(1);
                const isActive = activeSection === sectionId;
                return (
                  <Button 
                    key={item.name} 
                    variant="ghost" 
                    size="sm" 
                    asChild 
                    className={`hover:bg-secondary/10 px-2 py-1.5 h-auto transition-all duration-300 ${
                      isActive ? 'bg-secondary/20 text-secondary' : ''
                    }`}
                    title={item.name}
                  >
                    <Link
                      href={item.href}
                      className={`text-xs hover:text-secondary transition-colors duration-300 flex items-center justify-center ${
                        isActive ? 'text-secondary' : ''
                      }`}
                    >
                      <span className="text-xs font-medium">{item.name.length > 15 ? item.name.substring(0, 12) + '...' : item.name}</span>
                    </Link>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden flex-shrink-0">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-secondary/10">
                  <Menu className="h-5 w-5 text-primary" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background border-l border-border">
                <SheetHeader className="space-y-4">
                  <SheetTitle className="font-serif text-left text-primary text-xl">
                    NPK Impact Explorer
                  </SheetTitle>
                  <Badge variant="outline" className="w-fit text-xs px-2 py-1">
                    <BarChart3 className="w-3 h-3 mr-1" />
                    Agricultural Analysis
                  </Badge>
                  <SheetDescription className="text-left text-muted-foreground">
                    Explore two decades of fertilizer impact data
                  </SheetDescription>
                </SheetHeader>
                <div className="grid gap-3 py-6">
                  {navigationItems.map((item) => {
                    return (
                      <Button 
                        key={item.name} 
                        variant="ghost" 
                        className="justify-start hover:bg-secondary/10 h-auto py-3" 
                        asChild
                      >
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className="text-base font-medium w-full text-left"
                        >
                          <span>{item.name}</span>
                        </Link>
                      </Button>
                    );
                  })}
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