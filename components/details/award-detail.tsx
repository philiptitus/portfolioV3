'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Calendar, Award, Building2, MessageCircle } from 'lucide-react'
import { useEffect } from 'react'
import { useChat } from '@/contexts/chat-context'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { fetchAwardDetail } from '@/store/actions'

interface AwardDetailProps {
  id: number
}

export function AwardDetail({ id }: AwardDetailProps) {
  const { openChat } = useChat()
  const dispatch = useAppDispatch()
  const { awardDetail: award, detailLoading: loading, error } = useAppSelector(state => state.award)

  useEffect(() => {
    dispatch(fetchAwardDetail(id) as any)
  }, [id, dispatch])

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-48 bg-foreground/10 animate-pulse" />
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
          onClick={() => dispatch(fetchAwardDetail(id) as any)}
          className="px-3 py-2 border border-foreground text-xs font-mono uppercase hover:bg-foreground/10 transition-colors"
        >
          Retry
        </button>
      </div>
    )
  }

  if (!award) {
    return (
      <div className="text-center text-xs font-mono text-foreground/60">
        No award data available
      </div>
    )
  }

  const formattedDate = award.date
    ? new Date(award.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : ''

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
