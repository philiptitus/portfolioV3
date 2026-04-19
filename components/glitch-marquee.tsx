"use client"

import { motion } from "framer-motion"
import { Skill } from "@/data/mock-data"

const ease = [0.22, 1, 0.36, 1] as const

function SkillBlock({ name, score, glitch }: { name: string; score: number; glitch: boolean }) {
  return (
    <div
      className={`flex items-center justify-center px-6 py-3 border-r-2 border-foreground shrink-0 ${
        glitch ? "animate-glitch" : ""
      }`}
    >
      <div className="text-center">
        <span className="text-xs font-mono tracking-[0.15em] uppercase text-foreground whitespace-nowrap block">
          {name}
        </span>
        <span className="text-[10px] font-mono text-[#ea580c] tracking-widest">
          {score}%
        </span>
      </div>
    </div>
  )
}

interface GlitchMarqueeProps {
  skills?: Skill[]
}

export function GlitchMarquee({ skills = [] }: GlitchMarqueeProps) {
  const glitchIndices = [2, 6]
  const displaySkills = skills.length > 0 ? skills : []

  return (
    <section className="w-full py-16 px-6 lg:px-12 border-t-2 border-foreground">
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease }}
        className="flex items-center gap-4 mb-8"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
          {"// SECTION: PARTNER_ECOSYSTEM"}
        </span>
        <div className="flex-1 border-t border-border" />
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">006</span>
      </motion.div>

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease }}
        className="mb-8"
      >
        <h2 className="text-2xl lg:text-3xl font-mono font-bold tracking-tight uppercase text-balance">
          Core<br />
          <span className="text-[#ea580c]">Technical Stack</span>
        </h2>
        <p className="text-xs lg:text-sm font-mono text-muted-foreground mt-3 max-w-2xl">
          Proficiency in key technologies for building scalable systems and intelligent applications.
        </p>
      </motion.div>

      {/* Marquee */}
      {displaySkills.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease }}
          className="overflow-hidden border-2 border-foreground"
        >
          <div className="flex animate-marquee" style={{ width: "max-content" }}>
            {[...displaySkills, ...displaySkills].map((skill, i) => (
              <SkillBlock
                key={`${skill.id}-${i}`}
                name={skill.name}
                score={skill.score}
                glitch={glitchIndices.includes(i % displaySkills.length)}
              />
            ))}
          </div>
        </motion.div>
      )}
    </section>
  )
}
