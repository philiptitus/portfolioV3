'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { SkeletonLoader } from '@/components/skeleton-loader'
import { SlideOver } from '@/components/slide-over'
import { ExperienceDetail } from '@/components/details/experience-detail'
import { ExternalLink, Calendar, MapPin, Building2 } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { fetchJobs } from '@/store/actions'

const ease = [0.22, 1, 0.36, 1]

export default function ExperiencePage() {
  const dispatch = useAppDispatch()
  const { jobs, listLoading, error, pagination } = useAppSelector(state => state.job)
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null)

  useEffect(() => {
    dispatch(fetchJobs() as any)
  }, [dispatch])

  const handlePrevPage = () => {
    if (pagination.previous) {
      dispatch(fetchJobs(pagination.previous) as any)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleNextPage = () => {
    if (pagination.next) {
      dispatch(fetchJobs(pagination.next) as any)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleOpenDetail = (job: typeof jobs[0]) => {
    setSelectedJobId(job.id)
  }

  const handleCloseDetail = () => {
    setSelectedJobId(null)
  }

  if (listLoading) {
    return (
      <div className="min-h-screen dot-grid-bg">
        <Navbar />
        <main className="w-full px-6 py-20 lg:px-12">
          <div className="max-w-5xl mx-auto">
            <SkeletonLoader.Header />
            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0.6 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                  className="border-2 border-foreground p-6 space-y-4"
                >
                  <div className="h-5 bg-foreground/10 w-1/3" />
                  <div className="h-4 bg-foreground/10 w-1/2" />
                  <div className="h-3 bg-foreground/10 w-full" />
                </motion.div>
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
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-foreground/60 font-mono mb-4">{error}</p>
            <button
              onClick={() => dispatch(fetchJobs() as any)}
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
        <div className="max-w-5xl mx-auto">
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
              Professional
              <br />
              <span className="text-[#ea580c]">Experience</span>
            </h1>
            <p className="text-sm lg:text-base font-mono text-muted-foreground leading-relaxed max-w-2xl">
              {pagination.count || jobs.length} positions across diverse companies, building scalable systems and leading technical initiatives.
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
              {"// CAREER_TIMELINE"}
            </span>
            <div className="flex-1 border-t border-border" />
            <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">{pagination.count || jobs.length}</span>
          </motion.div>

          {/* Experience Cards */}
          <div className="space-y-6">
            {jobs.map((job, index) => {
              const startDate = new Date(job.start_date)
              const endDate = job.end_date ? new Date(job.end_date) : null
              const isCurrentJob = job.is_current

              return (
                <motion.div
                  key={job.id}
                  onClick={() => handleOpenDetail(job)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease }}
                  className={`border-2 ${isCurrentJob ? 'border-[#ea580c] bg-[#ea580c]/5' : 'border-foreground'} p-6 lg:p-8 hover:shadow-lg transition-shadow cursor-pointer`}
                >
                  {/* Header with current badge */}
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6 pb-6 border-b-2 border-foreground">
                    <div className="flex-1">
                      <h3 className="text-xl lg:text-2xl font-mono font-bold uppercase tracking-tight text-foreground mb-2">
                        {job.job_title}
                      </h3>
                      <p className="text-sm font-mono text-muted-foreground flex items-center gap-2">
                        <Building2 size={14} />
                        {job.company_name}
                      </p>
                    </div>
                    {isCurrentJob && (
                      <span className="inline-flex px-3 py-1 text-[10px] tracking-[0.15em] uppercase font-bold bg-[#ea580c] text-background">
                        CURRENT
                      </span>
                    )}
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                      <MapPin size={14} />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                      <Calendar size={14} />
                      {startDate.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                      })}
                      {endDate && ` - ${endDate.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                      })}`}
                      {isCurrentJob && ' - Present'}
                    </div>
                  </div>

                  {/* Company link */}
                  <motion.a
                    href={job.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 4 }}
                    className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-foreground border border-foreground px-4 py-2 hover:bg-foreground/10 transition-colors"
                  >
                    Visit Company
                    <ExternalLink size={12} />
                  </motion.a>
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
              {jobs.length ? `Items: ${jobs.length}` : 'No items'}
            </span>
            <button
              onClick={handleNextPage}
              disabled={!pagination.next}
              className="px-4 py-2 border border-foreground font-mono text-xs uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed hover:bg-foreground/10 transition-colors"
            >
              Next →
            </button>
          </div>

          {/* Stats section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease }}
            className="mt-16 pt-16 border-t-2 border-foreground grid grid-cols-2 lg:grid-cols-4 gap-4"
          >
            <div className="p-4 border border-foreground">
              <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono mb-2">Total Positions</p>
              <p className="text-3xl font-mono font-bold text-foreground">{pagination.count || jobs.length}</p>
            </div>
            <div className="p-4 border border-foreground">
              <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono mb-2">Current Role</p>
              <p className="text-sm font-mono text-foreground">Active</p>
            </div>
            <div className="p-4 border border-foreground">
              <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono mb-2">Experience</p>
              <p className="text-sm font-mono text-foreground">5+ Years</p>
            </div>
            <div className="p-4 border border-foreground">
              <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono mb-2">Locations</p>
              <p className="text-sm font-mono text-foreground">3 Global</p>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />

      {/* Detail Slide-Over */}
      <SlideOver
        isOpen={selectedJobId !== null}
        onClose={handleCloseDetail}
        title="Job Details"
      >
        {selectedJobId && <ExperienceDetail id={selectedJobId} />}
      </SlideOver>
    </div>
  )
}
