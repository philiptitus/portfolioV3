"use client"

import { motion } from "framer-motion"
import { Blog } from "@/data/mock-data"
import { BlogsShowcase } from "@/components/blogs-showcase"

const ease = [0.22, 1, 0.36, 1] as const

/* ── blinking cursor indicator ── */
function BlinkDot() {
  return <span className="inline-block h-2 w-2 bg-[#ea580c] animate-blink" />
}

interface PricingSectionProps {
  blogs?: Blog[]
  onBlogClick?: (blog: Blog) => void
}

export function PricingSection({ blogs = [], onBlogClick }: PricingSectionProps) {
  return (
    <section className="w-full px-6 py-20 lg:px-12 border-t-2 border-foreground">
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease }}
        className="flex items-center gap-4 mb-8"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
          {"// SECTION: TECHNICAL_INSIGHTS"}
        </span>
        <div className="flex-1 border-t border-border" />
        <BlinkDot />
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
          007
        </span>
      </motion.div>

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease }}
        className="mb-12"
      >
        <h2 className="text-2xl lg:text-3xl font-mono font-bold tracking-tight uppercase text-foreground text-balance mb-3">
          Technical Insights & <span className="text-[#ea580c]">Articles</span>
        </h2>
        <p className="text-xs lg:text-sm font-mono text-muted-foreground leading-relaxed max-w-2xl">
          Deep dives into cloud infrastructure, machine learning, and full-stack development. Sharing knowledge and best practices from building production systems.
        </p>
      </motion.div>

      {/* Blogs Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease }}
      >
        <BlogsShowcase blogs={blogs} onBlogClick={onBlogClick} />
      </motion.div>
    </section>
  )
}


