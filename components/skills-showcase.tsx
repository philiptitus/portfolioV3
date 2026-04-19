"use client"

import { motion } from "framer-motion"
import { Skill } from "@/data/mock-data"

const ease = [0.22, 1, 0.36, 1]

interface SkillsShowcaseProps {
  skills: Skill[]
}

export function SkillsShowcase({ skills }: SkillsShowcaseProps) {
  // Filter key skills
  const keySkills = skills.filter((s) => s.is_key_skill).slice(0, 8)

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease }}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        {keySkills.map((skill, idx) => (
          <motion.div
            key={skill.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.05, ease }}
            className="group relative"
          >
            <div className="border-2 border-foreground p-4 flex flex-col items-center gap-3 hover:bg-foreground/5 transition-colors duration-300">
              <div className="text-center w-full">
                <p className="text-[10px] font-mono font-bold tracking-widest text-foreground uppercase line-clamp-2">
                  {skill.name}
                </p>
                <div className="mt-3 relative h-6 flex items-center justify-center">
                  <div className="absolute inset-0 border border-foreground/20" />
                  <p className="text-[9px] font-mono text-[#ea580c] font-bold tracking-widest z-10 bg-background px-1">
                    {skill.score}%
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.5, ease }}
        className="border-y-2 border-foreground py-4 px-4 bg-background/50"
      >
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
              Skills
            </p>
            <p className="text-lg font-mono font-bold text-foreground">{skills.length}</p>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
              Key Skills
            </p>
            <p className="text-lg font-mono font-bold text-foreground">
              {skills.filter((s) => s.is_key_skill).length}
            </p>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
              Avg Score
            </p>
            <p className="text-lg font-mono font-bold text-foreground">
              {Math.round(skills.reduce((a, b) => a + b.score, 0) / skills.length)}%
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
