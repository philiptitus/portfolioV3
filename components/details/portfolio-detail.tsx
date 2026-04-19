"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ExternalLink, Github, Globe, MessageCircle } from "lucide-react"
import { useChat } from "@/contexts/chat-context"

interface Skill {
  id: number
  name: string
  score: number
}

interface PortfolioDetailProps {
  project: {
    id: number
    name: string
    description: string
    body?: string
    core_skill?: string
    category?: string
    tier?: string
    image_url?: string
    image2_url?: string | null
    url?: string
    url_2?: string | null
    skills?: Skill[]
    is_live?: boolean
  }
}

export function PortfolioDetail({ project }: PortfolioDetailProps) {
  const { openChat } = useChat()
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  const images = [
    project.image_url,
    project.image2_url,
  ].filter(Boolean) as string[]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Images */}
      {images.length > 0 && (
        <div className="space-y-3">
          <div className="border-2 border-foreground overflow-hidden aspect-video relative bg-foreground/5">
            {images[selectedImageIndex] && (
              <Image
                src={images[selectedImageIndex]}
                alt={project.name}
                fill
                className="object-cover"
              />
            )}
          </div>
          {images.length > 1 && (
            <div className="flex gap-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`h-16 w-20 border-2 overflow-hidden transition-colors ${
                    selectedImageIndex === idx ? "border-[#ea580c]" : "border-foreground"
                  }`}
                >
                  {img && (
                    <Image
                      src={img}
                      alt={`${project.name} ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Project Info */}
      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            {project.tier && (
              <span className="text-xs font-mono bg-[#ea580c]/20 text-[#ea580c] px-2 py-1 uppercase tracking-widest">
                {project.tier}
              </span>
            )}
            {project.is_live && (
              <span className="text-xs font-mono bg-foreground/10 text-foreground px-2 py-1 uppercase tracking-widest">
                Live
              </span>
            )}
          </div>
          <h3 className="text-lg font-mono font-bold uppercase tracking-tight mb-2">
            {project.name}
          </h3>
          {project.category && (
            <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3">
              {project.category}
            </p>
          )}
        </div>

        <p className="text-sm font-mono text-foreground/80 leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* Links */}
      {(project.url || project.url_2) && (
        <div className="border-t-2 border-foreground pt-4 space-y-2">
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-mono text-[#ea580c] hover:text-[#ea580c]/80 uppercase tracking-widest transition-colors"
            >
              <Globe size={14} /> View Project
              <ExternalLink size={12} />
            </a>
          )}
          {project.url_2 && (
            <a
              href={project.url_2}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-mono text-[#ea580c] hover:text-[#ea580c]/80 uppercase tracking-widest transition-colors"
            >
              <Github size={14} /> View Repository
              <ExternalLink size={12} />
            </a>
          )}
        </div>
      )}

      {/* Skills */}
      {project.skills && project.skills.length > 0 && (
        <div className="border-t-2 border-foreground pt-4">
          <h4 className="text-xs font-mono font-bold uppercase tracking-widest mb-3">
            Technologies
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.skills.map((skill) => (
              <div
                key={skill.id}
                className="border border-foreground px-3 py-1.5 text-xs font-mono uppercase tracking-widest"
              >
                {skill.name}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Full Description */}
      {project.body && (
        <div className="border-t-2 border-foreground pt-4">
          <h4 className="text-xs font-mono font-bold uppercase tracking-widest mb-3">
            Full Details
          </h4>
          <div
            className="text-xs font-mono text-foreground/75 leading-relaxed space-y-3 prose prose-invert prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: project.body }}
          />
        </div>
      )}

      {/* Ask AI Button */}
      <div className="border-t-2 border-foreground pt-4">
        <button
          onClick={() => openChat(`Tell me about this portfolio project: ${project.name}`)}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 border-2 border-[#ea580c] bg-[#ea580c]/10 text-[#ea580c] text-xs font-mono uppercase tracking-widest hover:bg-[#ea580c]/20 transition-colors"
        >
          <MessageCircle size={14} />
          Ask AI
        </button>
      </div>
    </motion.div>
  )
}
