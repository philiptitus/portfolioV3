"use client"

import { TerminalCard } from "@/components/bento/terminal-card"
import { PortfolioShowcase } from "@/components/portfolio-showcase"
import { motion } from "framer-motion"
import { portfolioProjects } from "@/data/mock-data"

const ease = [0.22, 1, 0.36, 1] as const

interface FeatureGridProps {
  onPortfolioClick?: (project: any) => void
}

export function FeatureGrid({ onPortfolioClick }: FeatureGridProps) {
  return (
    <section className="w-full px-6 py-20 lg:px-12">
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease }}
        className="flex items-center gap-4 mb-8"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
          {"// SECTION: PORTFOLIO_CORE"}
        </span>
        <div className="flex-1 border-t border-border" />
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">004</span>
      </motion.div>

      {/* Portfolio Projects Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease }}
        className="mb-12"
      >
        <PortfolioShowcase projects={portfolioProjects} onProjectClick={onPortfolioClick} />
      </motion.div>

      {/* Interactive Section with Terminal Chat */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, delay: 0.1, ease }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 border-2 border-foreground gap-0">
          {/* Terminal - AI Chatbot */}
          <div className="border-b-2 lg:border-b-0 lg:border-r-2 border-foreground min-h-[320px]">
            <TerminalCard />
          </div>

          {/* Info section */}
          <div className="p-6 lg:p-8 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5, ease }}
              className="space-y-4"
            >
              <h3 className="text-lg lg:text-xl font-mono font-bold uppercase tracking-tight text-balance">
                Ready to collaborate?
              </h3>
              <p className="text-xs lg:text-sm font-mono text-muted-foreground leading-relaxed">
                I am available for consulting, full-stack development, ML engineering, and specialized work. Let's build something amazing together.
              </p>
              <div className="pt-4 border-t-2 border-foreground">
                <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono mb-3">
                  Available for
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Contracts", "Freelance", "Full-time", "Consulting"].map((item) => (
                    <span
                      key={item}
                      className="text-[10px] tracking-widest uppercase px-3 py-1.5 border border-foreground/50 font-mono"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
