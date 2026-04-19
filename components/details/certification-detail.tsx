"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Calendar, ExternalLink, Award, MessageCircle } from "lucide-react"
import { useChat } from "@/contexts/chat-context"

interface CertificationDetailProps {
  cert: {
    id: number
    name: string
    title?: string
    description?: string
    image_url?: string
    url?: string
    date?: string
    is_active?: boolean
    is_ongoing?: boolean
  }
}

export function CertificationDetail({ cert }: CertificationDetailProps) {
  const { openChat } = useChat()
  const formattedDate = new Date(cert.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Certification Image */}
      {cert.image_url && (
        <div className="border-2 border-foreground overflow-hidden bg-foreground/5">
          <div className="relative aspect-square">
            <Image
              src={cert.image_url}
              alt={cert.name}
              fill
              className="object-cover"
            />
          </div>
        </div>
      )}

      {/* Status Badges */}
      <div className="flex gap-2 flex-wrap">
        {cert.is_active && (
          <span className="text-xs font-mono bg-[#ea580c]/20 text-[#ea580c] px-2 py-1 uppercase tracking-widest">
            Active
          </span>
        )}
        {cert.is_ongoing && (
          <span className="text-xs font-mono bg-foreground/10 text-foreground px-2 py-1 uppercase tracking-widest">
            Ongoing
          </span>
        )}
        {cert.date && (
          <span className="text-xs font-mono bg-foreground/5 text-muted-foreground px-2 py-1 uppercase tracking-widest">
            {formattedDate}
          </span>
        )}
      </div>

      {/* Certification Info */}
      <div className="space-y-3 border-b-2 border-foreground pb-4">
        <div className="flex items-start gap-3">
          <Award size={20} className="text-[#ea580c] mt-1 flex-shrink-0" />
          <div>
            {cert.title && (
              <h3 className="text-lg font-mono font-bold uppercase tracking-tight mb-1">
                {cert.title}
              </h3>
            )}
            <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
              {cert.name}
            </p>
          </div>
        </div>
      </div>

      {/* Description */}
      {cert.description && (
        <div className="space-y-3">
          <p className="text-sm font-mono text-foreground/80 leading-relaxed">
            {cert.description}
          </p>
        </div>
      )}

      {/* Verify Button */}
      {cert.url && (
        <div className="border-t-2 border-foreground pt-4">
          <a
            href={cert.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 border-2 border-[#ea580c] text-[#ea580c] text-xs font-mono uppercase tracking-widest hover:bg-[#ea580c]/10 transition-colors"
          >
            <span>Verify Credential</span>
            <ExternalLink size={12} />
          </a>
        </div>
      )}

      {/* Calendar Info */}
      {cert.date && (
        <div className="border-t-2 border-foreground pt-4 space-y-2">
          <h4 className="text-xs font-mono font-bold uppercase tracking-widest">
            Certificate Date
          </h4>
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
            <Calendar size={14} />
            {formattedDate}
          </div>
        </div>
      )}

      {/* Ask AI Button */}
      <div className="border-t-2 border-foreground pt-4">
        <button
          onClick={() => openChat(`Tell me about this certification: ${cert.name}`)}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 border-2 border-[#ea580c] bg-[#ea580c]/10 text-[#ea580c] text-xs font-mono uppercase tracking-widest hover:bg-[#ea580c]/20 transition-colors"
        >
          <MessageCircle size={14} />
          Ask AI
        </button>
      </div>
    </motion.div>
  )
}
