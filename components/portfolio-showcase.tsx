"use client"

import { motion } from "framer-motion"
import { Portfolio } from "@/data/mock-data"
import Image from "next/image"

const ease = [0.22, 1, 0.36, 1]

interface PortfolioShowcaseProps {
  projects: Portfolio[]
  onProjectClick?: (project: Portfolio) => void
}

export function PortfolioShowcase({ projects, onProjectClick }: PortfolioShowcaseProps) {
  // Get featured projects
  const featured = projects.filter((p) => p.featured).slice(0, 2)
  const others = projects.filter((p) => !p.featured).slice(0, 3)

  return (
    <div className="space-y-6">
      {/* Featured projects */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-4"
      >
        {featured.map((project, idx) => (
          <motion.div
            key={project.id}
            onClick={() => onProjectClick?.(project)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1, ease }}
            className="group cursor-pointer"
          >
            <div className="relative h-64 overflow-hidden border-2 border-foreground bg-background">
              {project.image_url && (
                <Image
                  src={project.image_url}
                  alt={project.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              )}
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-colors duration-300" />
              <div className="absolute inset-0 flex flex-col justify-between p-4">
                <div className="flex items-start justify-between">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-white/70 font-mono bg-black/40 px-2 py-1">
                    {project.category}
                  </span>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-[#ea580c] font-mono font-bold">
                    TIER {project.tier}
                  </span>
                </div>
                <div className="text-white font-mono">
                  <p className="font-bold text-balance text-lg">{project.name}</p>
                  <p className="text-xs text-white/70 mt-2">{project.description}</p>
                  <p className="text-[10px] text-white/50 mt-2 tracking-widest">
                    {project.core_skill}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Other projects grid */}
      {others.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.2, ease }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {others.map((project, idx) => (
            <motion.div
              key={project.id}
              onClick={() => onProjectClick?.(project)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (idx + 2) * 0.1, ease }}
              className="group cursor-pointer"
            >
              <div className="relative h-40 overflow-hidden border-2 border-foreground bg-background">
                {project.image_url && (
                  <Image
                    src={project.image_url}
                    alt={project.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                )}
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-colors duration-300" />
                <div className="absolute inset-0 flex flex-col justify-end p-3">
                  <p className="text-white font-mono text-sm font-bold">{project.name}</p>
                  <p className="text-[10px] text-white/60 mt-1">{project.core_skill}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.5, ease }}
        className="border-2 border-foreground p-4 grid grid-cols-3 gap-4 text-center"
      >
        <div>
          <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
            Projects
          </p>
          <p className="text-2xl font-mono font-bold text-foreground">{projects.length}</p>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
            Featured
          </p>
          <p className="text-2xl font-mono font-bold text-[#ea580c]">
            {projects.filter((p) => p.featured).length}
          </p>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
            Live
          </p>
          <p className="text-2xl font-mono font-bold text-foreground">
            {projects.filter((p) => p.is_live).length}
          </p>
        </div>
      </motion.div>
    </div>
  )
}
