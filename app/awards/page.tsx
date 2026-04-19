'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { SkeletonLoader } from '@/components/skeleton-loader'
import { SlideOver } from '@/components/slide-over'
import { AwardDetail } from '@/components/details/award-detail'
import { Calendar, Trophy } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { fetchAwards } from '@/store/actions'

const ease = [0.22, 1, 0.36, 1]

export default function AwardsPage() {
  const dispatch = useAppDispatch()
  const { awards, listLoading, error, pagination } = useAppSelector(state => state.award)
  const [selectedAwardId, setSelectedAwardId] = useState<number | null>(null)

  useEffect(() => {
    dispatch(fetchAwards() as any)
  }, [dispatch])

  const handlePrevPage = () => {
    if (pagination.previous) {
      dispatch(fetchAwards(pagination.previous) as any)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleNextPage = () => {
    if (pagination.next) {
      dispatch(fetchAwards(pagination.next) as any)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleOpenDetail = (award: typeof awards[0]) => {
    setSelectedAwardId(award.id)
  }

  const handleCloseDetail = () => {
    setSelectedAwardId(null)
  }

  if (listLoading) {
    return (
      <div className="min-h-screen dot-grid-bg">
        <Navbar />
        <main className="w-full px-6 py-20 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <SkeletonLoader.Header />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <SkeletonLoader.Certificate key={i} />
              ))}
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen dot-grid-bg">
        <Navbar />
        <main className="w-full px-6 py-20 lg:px-12">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-foreground/60 font-mono mb-4">{error}</p>
            <button
              onClick={() => dispatch(fetchAwards() as any)}
              className="px-4 py-2 border border-foreground hover:bg-foreground/10 transition-colors font-mono text-sm"
            >
              Retry
            </button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen dot-grid-bg">
      <Navbar />
      <main className="w-full px-6 py-20 lg:px-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="mb-16"
          >
            <Link href="/" className="text-xs font-mono tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors mb-6 inline-block">
              ← BACK TO HOME
            </Link>
            <h1 className="text-4xl lg:text-5xl font-mono font-bold tracking-tight uppercase mb-4 text-balance">
              Awards &
              <br />
              <span className="text-[#ea580c]">Recognition</span>
            </h1>
            <p className="text-sm lg:text-base font-mono text-muted-foreground leading-relaxed max-w-2xl">
              Recognition from industry leaders and hackathon organizations. Awarded for innovation, technical excellence, and problem-solving in cutting-edge projects.
            </p>
          </motion.div>

          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease }}
            className="flex items-center gap-4 mb-12"
          >
            <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
              {"// SECTION: AWARDS_GALLERY"}
            </span>
            <div className="flex-1 border-t border-border" />
            <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">{pagination.count || awards.length}</span>
          </motion.div>

          {/* Awards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {awards.map((award, index) => {
              const awardDate = new Date(award.date)
              const formattedDate = awardDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })

              return (
                <motion.div
                  key={award.id}
                  onClick={() => handleOpenDetail(award)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.08, ease }}
                  className="group border-2 border-foreground overflow-hidden hover:shadow-lg transition-shadow cursor-pointer hover:border-[#ea580c]"
                >
                  {/* Image */}
                  <div className="relative h-48 lg:h-56 bg-foreground/5 overflow-hidden border-b-2 border-foreground">
                    {award.image_url ? (
                      <Image
                        src={award.image_url}
                        alt={award.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-foreground/10">
                        <Trophy size={48} className="text-foreground/30" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Trophy size={14} className="text-[#ea580c]" />
                      <span className="text-[10px] tracking-[0.15em] uppercase font-mono text-[#ea580c] font-bold">
                        Award
                      </span>
                    </div>

                    <h3 className="text-sm lg:text-base font-mono font-bold uppercase tracking-tight text-foreground mb-2 line-clamp-2 group-hover:text-[#ea580c] transition-colors">
                      {award.title}
                    </h3>

                    <p className="text-xs font-mono text-muted-foreground mb-3 line-clamp-2">
                      {award.issued_by}
                    </p>

                    <div className="flex items-center gap-2 pt-3 border-t border-foreground text-[10px] font-mono text-muted-foreground">
                      <Calendar size={12} />
                      {formattedDate}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center justify-between gap-4 mt-12 pt-8 border-t border-border">
            <button
              onClick={handlePrevPage}
              disabled={!pagination.previous}
              className="px-4 py-2 border border-foreground font-mono text-xs uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed hover:bg-foreground/10 transition-colors"
            >
              ← Previous
            </button>
            <span className="text-xs font-mono text-muted-foreground">
              {awards.length ? `Items: ${awards.length}` : 'No items'}
            </span>
            <button
              onClick={handleNextPage}
              disabled={!pagination.next}
              className="px-4 py-2 border border-foreground font-mono text-xs uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed hover:bg-foreground/10 transition-colors"
            >
              Next →
            </button>
          </div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease }}
            className="pt-16 border-t-2 border-foreground"
          >
            <h2 className="text-2xl font-mono font-bold uppercase mb-8 text-balance">
              Recognition
              <br />
              <span className="text-[#ea580c]">Statistics</span>
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-6 border-2 border-foreground">
                <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono mb-2">Total Awards</p>
                <p className="text-4xl font-mono font-bold text-foreground">{pagination.count || awards.length}</p>
              </div>
              <div className="p-6 border-2 border-foreground">
                <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono mb-2">Hackathons</p>
                <p className="text-4xl font-mono font-bold text-foreground">3</p>
              </div>
              <div className="p-6 border-2 border-foreground">
                <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono mb-2">Years Active</p>
                <p className="text-4xl font-mono font-bold text-foreground">2</p>
              </div>
              <div className="p-6 border-2 border-foreground">
                <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono mb-2">Organizations</p>
                <p className="text-4xl font-mono font-bold text-foreground">4</p>
              </div>
            </div>
          </motion.div>

          {/* Achievements Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease }}
            className="mt-16 pt-16 border-t-2 border-foreground"
          >
            <h2 className="text-2xl font-mono font-bold uppercase mb-8">
              Latest
              <br />
              <span className="text-[#ea580c]">Achievements</span>
            </h2>
            <div className="space-y-4">
              {awards.slice(0, 3).map((award, index) => {
                const awardDate = new Date(award.date)
                const formattedDate = awardDate.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                })

                return (
                  <motion.div
                    key={award.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1, ease }}
                    className="border-l-2 border-[#ea580c] pl-6 py-3"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">
                      <div>
                        <p className="text-sm font-mono font-bold text-foreground uppercase">{award.title}</p>
                        <p className="text-xs font-mono text-muted-foreground">{award.issued_by}</p>
                      </div>
                      <span className="text-[10px] font-mono text-[#ea580c] tracking-widest uppercase font-bold">
                        {formattedDate}
                      </span>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />

      {/* Detail Slide-Over */}
      <SlideOver
        isOpen={selectedAwardId !== null}
        onClose={handleCloseDetail}
        title="Award Details"
      >
        {selectedAwardId && <AwardDetail id={selectedAwardId} />}
      </SlideOver>
    </div>
  )
}
