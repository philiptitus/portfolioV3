'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Calendar, Award, Building2, MessageCircle } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useChat } from '@/contexts/chat-context'

interface AwardDetailProps {
  award: {
    id: number
    title?: string
    description?: string
    issued_by?: string
    date?: string
    image_url?: string
    is_active?: boolean
  }
}

export function AwardDetail({ award }: AwardDetailProps) {
  const { openChat } = useChat()
  const [formattedDate, setFormattedDate] = useState('')

  useEffect(() => {
    if (award.date) {
      const date = new Date(award.date)
      setFormattedDate(
        date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      )
    }
  }, [award.date])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Award Image */}
      {award.image_url && (
        <div className="border-2 border-foreground overflow-hidden bg-foreground/5">
          <div className="relative aspect-video">
            <Image
              src={award.image_url}
              alt={award.title || 'Award'}
              fill
              className="object-cover"
            />
          </div>
        </div>
      )}

      {/* Award Info */}
      <div className="space-y-3 border-b-2 border-foreground pb-4">
        <div className="flex items-start gap-3">
          <Award size={20} className="text-[#ea580c] mt-1 flex-shrink-0" />
          <div>
            {award.title && (
              <h3 className="text-lg font-mono font-bold uppercase tracking-tight mb-1">
                {award.title}
              </h3>
            )}
            {award.issued_by && (
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                {award.issued_by}
              </p>
            )}
          </div>
        </div>

        {/* Status Badge */}
        {award.is_active && (
          <div className="flex gap-2">
            <span className="text-xs font-mono bg-[#ea580c]/20 text-[#ea580c] px-2 py-1 uppercase tracking-widest">
              Active
            </span>
          </div>
        )}
      </div>

      {/* Description */}
      {award.description && (
        <div className="space-y-3">
          <div
            className="text-sm font-mono text-foreground/80 leading-relaxed space-y-3"
            dangerouslySetInnerHTML={{ __html: award.description }}
          />
        </div>
      )}

      {/* Award Date */}
      {award.date && (
        <div className="border-t-2 border-foreground pt-4 space-y-2">
          <h4 className="text-xs font-mono font-bold uppercase tracking-widest">
            Award Date
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
          onClick={() => openChat(`Tell me about this award: ${award.title || award.issued_by}`)}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 border-2 border-[#ea580c] bg-[#ea580c]/10 text-[#ea580c] text-xs font-mono uppercase tracking-widest hover:bg-[#ea580c]/20 transition-colors"
        >
          <MessageCircle size={14} />
          Ask AI
        </button>
      </div>
    </motion.div>
  )
}
