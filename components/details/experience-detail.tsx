'use client'

import { motion } from 'framer-motion'
import { Calendar, MapPin, Building2, ExternalLink, MessageCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useChat } from '@/contexts/chat-context'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { fetchJobDetail } from '@/store/actions'

interface ExperienceDetailProps {
  id: number
}

export function ExperienceDetail({ id }: ExperienceDetailProps) {
  const { openChat } = useChat()
  const dispatch = useAppDispatch()
  const { jobDetail: job, detailLoading: loading, error } = useAppSelector(state => state.job)
  const [formattedDates, setFormattedDates] = useState({ start: '', end: '' })

  useEffect(() => {
    dispatch(fetchJobDetail(id) as any)
  }, [id, dispatch])

  useEffect(() => {
    if (job?.start_date) {
      const startDate = new Date(job.start_date)
      setFormattedDates((prev) => ({
        ...prev,
        start: startDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
        }),
      }))
    }
    if (job?.end_date) {
      const endDate = new Date(job.end_date)
      setFormattedDates((prev) => ({
        ...prev,
        end: endDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
        }),
      }))
    }
  }, [job?.start_date, job?.end_date])

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-24 bg-foreground/10 animate-pulse" />
        <div className="h-4 bg-foreground/10 w-3/4 animate-pulse" />
        <div className="space-y-2">
          <div className="h-3 bg-foreground/10 w-full animate-pulse" />
          <div className="h-3 bg-foreground/10 w-2/3 animate-pulse" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center space-y-3">
        <p className="text-xs font-mono text-foreground/60">{error}</p>
        <button
          onClick={() => dispatch(fetchJobDetail(id) as any)}
          className="px-3 py-2 border border-foreground text-xs font-mono uppercase hover:bg-foreground/10 transition-colors"
        >
          Retry
        </button>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="text-center text-xs font-mono text-foreground/60">
        No job data available
      </div>
    )
  }

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
