"use client"

import { useState } from "react"
import Link from "next/link"
import { Cpu, ChevronDown } from "lucide-react"
import { motion } from "framer-motion"
import { ThemeToggle } from "@/components/theme-toggle"

export function Navbar() {
  const [showMore, setShowMore] = useState(false)

  const navItems = [
    { label: "About", href: "/about" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Blog", href: "/blog" },
    { label: "Certifications", href: "/certifications" },
    { label: "Contact", href: "/contact" },
  ]

  const moreItems = [
    { label: "Awards", href: "/awards" },
    { label: "Experience", href: "/experience" },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="w-full px-4 pt-4 lg:px-6 lg:pt-6"
    >
      <nav className="w-full border border-foreground/20 bg-background/80 backdrop-blur-sm px-6 py-3 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <Cpu size={16} strokeWidth={1.5} />
            <span className="text-xs font-mono tracking-[0.15em] uppercase font-bold">
              FILIPIO.COM
            </span>
          </Link>

          {/* Center nav links */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item, i) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-xs font-mono tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}

            {/* More dropdown */}
            <div className="relative group">
              <button
                onClick={() => setShowMore(!showMore)}
                className="text-xs font-mono tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-1"
              >
                More
                <ChevronDown size={12} className={`transition-transform ${showMore ? "rotate-180" : ""}`} />
              </button>
              {showMore && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 border border-foreground bg-background z-50"
                >
                  {moreItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="block px-4 py-2 text-xs font-mono tracking-widest uppercase text-muted-foreground hover:text-foreground hover:bg-foreground/10 transition-colors border-b last:border-b-0"
                    >
                      {item.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </div>
          </div>

          {/* Right side: Contact + CTA */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <a
              href="mailto:hi@filipio.com"
              className="hidden sm:block text-xs font-mono tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Email
            </a>
            <Link
              href="/contact"
              className="bg-foreground text-background px-4 py-2 text-xs font-mono tracking-widest uppercase inline-block hover:opacity-90 transition-opacity"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </nav>
    </motion.div>
  )
}
