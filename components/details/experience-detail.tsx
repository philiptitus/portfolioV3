'use client'

import { motion } from 'framer-motion'
import { Calendar, MapPin, Building2, ExternalLink, MessageCircle } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useChat } from '@/contexts/chat-context'

interface ExperienceDetailProps {
  job: {
    id: number
    job_title?: string
    company_name?: string
    location?: string
    description?: string
    start_date?: string
    end_date?: string | null
    is_current?: boolean
    url?: string
  }
}

export function ExperienceDetail({ job }: ExperienceDetailProps) {
  const { openChat } = useChat()
  const [formattedDates, setFormattedDates] = useState({ start: '', end: '' })

  useEffect(() => {
    if (job.start_date) {
      const startDate = new Date(job.start_date)
      setFormattedDates((prev) => ({
        ...prev,
        start: startDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
        }),
      }))
    }
    if (job.end_date) {
      const endDate = new Date(job.end_date)
      setFormattedDates((prev) => ({
        ...prev,
        end: endDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
        }),
      }))
    }
  }, [job.start_date, job.end_date])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Job Header */}
      <div className="space-y-3 border-b-2 border-foreground pb-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1">
            <Building2 size={20} className="text-[#ea580c] mt-1 flex-shrink-0" />
            <div>
              {job.job_title && (
                <h3 className="text-lg font-mono font-bold uppercase tracking-tight mb-1">
                  {job.job_title}
                </h3>
              )}
              {job.company_name && (
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                  {job.company_name}
                </p>
              )}
            </div>
          </div>
          {job.is_current && (
            <span className="text-xs font-mono bg-[#ea580c]/20 text-[#ea580c] px-2 py-1 uppercase tracking-widest whitespace-nowrap">
              Current
            </span>
          )}
        </div>
      </div>

      {/* Location */}
      {job.location && (
        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
          <MapPin size={14} />
          {job.location}
        </div>
      )}

      {/* Employment Period */}
      {(job.start_date || job.end_date) && (
        <div className="space-y-2 border-b-2 border-foreground pb-4">
          <h4 className="text-xs font-mono font-bold uppercase tracking-widest">
            Employment Period
          </h4>
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
            <Calendar size={14} />
            <span>
              {formattedDates.start}
              {formattedDates.end ? ` - ${formattedDates.end}` : ' - Present'}
            </span>
          </div>
        </div>
      )}

      {/* Description */}
      {job.description && (
        <div className="space-y-3">
          <h4 className="text-xs font-mono font-bold uppercase tracking-widest">
            About This Role
          </h4>
          <p className="text-sm font-mono text-foreground/80 leading-relaxed whitespace-pre-wrap">
            {job.description}
          </p>
        </div>
      )}

      {/* Company Link */}
      {job.url && (
        <div className="border-t-2 border-foreground pt-4">
          <a
            href={job.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-mono text-[#ea580c] hover:text-[#ea580c]/80 uppercase tracking-widest transition-colors"
          >
            Visit Company Website
            <ExternalLink size={12} />
          </a>
        </div>
      )}

      {/* Ask AI Button */}
      <div className="border-t-2 border-foreground pt-4">
        <button
          onClick={() => openChat(`Tell me about this job experience: ${job.job_title} at ${job.company_name}`)}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 border-2 border-[#ea580c] bg-[#ea580c]/10 text-[#ea580c] text-xs font-mono uppercase tracking-widest hover:bg-[#ea580c]/20 transition-colors"
        >
          <MessageCircle size={14} />
          Ask AI
        </button>
      </div>
    </motion.div>
  )
}
