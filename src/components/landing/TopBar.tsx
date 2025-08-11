"use client"

import Link from "next/link"
import { useState } from "react"
import { useTheme } from "next-themes"
import { Menu, X, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Topbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  const navLinks = (
    <ul className="flex flex-col md:flex-row md:items-center gap-6">
      <li>
        <Link href="/" className="hover:text-primary">Home</Link>
      </li>
      <li>
        <Link href="/pricing" className="hover:text-primary">Pricing</Link>
      </li>
    </ul>
  )

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-background/70 backdrop-blur border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            {/* Logo/Brand */}
            <Link href="/" className="text-lg font-bold text-foreground">
                SMSPlatform
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-6">
                {navLinks}
                <div className="flex items-center gap-2">
                    <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Toggle theme"
                    onClick={toggleTheme}
                    >
                        {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
                    </Button>
                    <Button variant="outline" asChild>
                        <Link href="/auth/accounts/login">Login</Link>
                    </Button>
                    <Button asChild>
                        <Link href="/auth/accounts/signup">Sign Up</Link>
                    </Button>
                </div>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center gap-2">
                <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Toggle theme"
                    onClick={toggleTheme}
                >
                    {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={20} /> : <Menu size={20} />}
                </Button>
            </div>
        </div>

      {/* Mobile nav menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-t border-border px-4 pb-4">
          {navLinks}
          <div className="mt-4 flex flex-col gap-3">
            <Button variant="outline" asChild>
              <Link href="/auth/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/auth/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
