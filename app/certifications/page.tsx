'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { fetchCertificates } from '@/store/actions'
import { SkeletonCard } from '@/components/skeleton-loader'
import { SlideOver } from '@/components/slide-over'
import { CertificationDetail } from '@/components/details/certification-detail'
import Link from 'next/link'
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as const

export default function CertificationsPage() {
  const dispatch = useAppDispatch()
  const { certificates, listLoading, error, pagination } = useAppSelector(state => state.certificate)
  
  const [selectedCertId, setSelectedCertId] = useState<number | null>(null)

  useEffect(() => {
    dispatch(fetchCertificates() as any)
  }, [dispatch])

  const handleOpenDetail = (cert: typeof certificates[0]) => {
    setSelectedCertId(cert.id)
  }

  const handleCloseDetail = () => {
    setSelectedCertId(null)
  }

  const handlePrevPage = () => {
    if (pagination.previous) {
      dispatch(fetchCertificates(pagination.previous) as any)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handleNextPage = () => {
    if (pagination.next) {
      dispatch(fetchCertificates(pagination.next) as any)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  if (error) {
    return (
      <div className="min-h-screen dot-grid-bg flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Unable to Load Certifications</h2>
            <p className="text-muted-foreground mb-4">{error}</p>
            <button
              onClick={() => dispatch(fetchCertificates() as any)}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
            >
              Try Again
            </button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen dot-grid-bg">
      <Navbar />
      <main className="w-full px-6 py-12 lg:px-12 lg:py-16">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="mb-12 border-2 border-foreground p-6 lg:p-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
              {'// SECTION: CREDENTIALS'}
            </span>
            <div className="flex-1 border-t border-border" />
          </div>

          <h1 className="text-3xl lg:text-4xl font-mono font-bold tracking-tight uppercase mb-4 text-balance">
            Professional
            <br />
            <span className="text-[#ea580c]">Certifications</span>
          </h1>
          <p className="text-xs lg:text-sm font-mono text-muted-foreground leading-relaxed max-w-2xl">
            Industry-recognized credentials demonstrating expertise in cloud platforms, Kubernetes, ML, and infrastructure. Continuously learning and staying current with emerging technologies.
          </p>
        </motion.div>

        {/* Certificates Grid */}
        {listLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {certificates.map((cert, idx) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: idx * 0.05, duration: 0.5, ease }}
                onClick={() => handleOpenDetail(cert)}
                className="group border-2 border-foreground overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer hover:border-[#ea580c]"
              >
                {/* Image Container */}
                <div className="relative h-48 bg-foreground/5 overflow-hidden">
                  <img
                    src={cert.image_url}
                    alt={cert.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 border-2 border-foreground/20" />
                </div>

                {/* Content */}
                <div className="p-4 lg:p-5 border-t-2 border-foreground space-y-3">
                  <div>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono mb-1">
                      {cert.is_ongoing ? 'In Progress' : 'Completed'}
                    </p>
                    <h3 className="text-sm font-mono font-bold uppercase text-foreground line-clamp-2 group-hover:text-[#ea580c] transition-colors">
                      {cert.title}
                    </h3>
                  </div>

                  <div className="border-t border-foreground/20 pt-3">
                    <p className="text-[10px] tracking-widest uppercase text-muted-foreground font-mono">
                      {new Date(cert.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                  </div>

                  {cert.url ? (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[10px] tracking-widest uppercase font-mono text-[#ea580c] hover:text-foreground transition-colors mt-2"
                    >
                      View Credential
                      <ExternalLink size={12} />
                    </a>
                  ) : (
                    <div className="text-[10px] tracking-widest uppercase font-mono text-muted-foreground/50 mt-2">
                      No Public URL
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Pagination */}
        {!listLoading && (pagination.next || pagination.previous) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="flex items-center justify-center gap-4 mt-12 pt-8 border-t-2 border-foreground"
          >
            <button
              onClick={handlePrevPage}
              disabled={!pagination.previous}
              className="flex items-center gap-2 px-4 py-2 border-2 border-foreground text-xs font-mono tracking-widest uppercase disabled:opacity-50 hover:bg-foreground/10 transition-colors"
            >
              <ChevronLeft size={14} />
              Previous
            </button>

            <div className="flex-1 text-center">
              <span className="text-xs font-mono text-muted-foreground">
                {certificates.length} items shown of {pagination.count}
              </span>
            </div>

            <button
              onClick={handleNextPage}
              disabled={!pagination.next}
              className="flex items-center gap-2 px-4 py-2 border-2 border-foreground text-xs font-mono tracking-widest uppercase disabled:opacity-50 hover:bg-foreground/10 transition-colors"
            >
              Next
              <ChevronRight size={14} />
            </button>
          </motion.div>
        )}

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5, ease }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12 pt-8 border-t-2 border-foreground"
        >
          {[
            { label: 'Total Certifications', value: certificates.length.toString() },
            { label: 'Active', value: certificates.filter((c) => c.is_active).length.toString() },
            { label: 'In Progress', value: certificates.filter((c) => c.is_ongoing).length.toString() },
            { label: 'With Credentials', value: certificates.filter((c) => c.url).length.toString() },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease }}
            >
              <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono mb-2">
                {stat.label}
              </p>
              <p className="text-2xl lg:text-3xl font-mono font-bold text-[#ea580c]">{stat.value}</p>
            </motion.div>
          ))}
        </motion.div>
      </main>
      <Footer />

      {/* Detail Slide-Over */}
      <SlideOver
        isOpen={selectedCertId !== null}
        onClose={handleCloseDetail}
        title="Certification Details"
      >
        {selectedCertId && <CertificationDetail id={selectedCertId} />}
      </SlideOver>
    </div>
  )
}
