"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SkeletonPortfolioGrid, SkeletonHeader } from "@/components/skeleton-loader"
import { SlideOver } from "@/components/slide-over"
import { PortfolioDetail } from "@/components/details/portfolio-detail"
import { portfolioProjects } from "@/data/mock-data"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

const ITEMS_PER_PAGE = 6
const ease = [0.22, 1, 0.36, 1] as const

export default function PortfolioPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [projects, setProjects] = useState(portfolioProjects)
  const [selectedProject, setSelectedProject] = useState<typeof portfolioProjects[0] | null>(null)
  const [isDetailLoading, setIsDetailLoading] = useState(false)

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setProjects(portfolioProjects)
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE)
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE
  const endIdx = startIdx + ITEMS_PER_PAGE
  const currentProjects = projects.slice(startIdx, endIdx)

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handleOpenDetail = (project: typeof portfolioProjects[0]) => {
    setIsDetailLoading(true)
    // Simulate API call to fetch full details
    setTimeout(() => {
      setSelectedProject(project)
      setIsDetailLoading(false)
    }, 600)
  }

  const handleCloseDetail = () => {
    setSelectedProject(null)
  }

  return (
    <div className="min-h-screen dot-grid-bg flex flex-col">
      <Navbar />
      <main className="flex-1 w-full px-6 py-20 lg:px-12">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease }}
          className="flex items-center gap-4 mb-8"
        >
          <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
            {"// SECTION: PORTFOLIO"}
          </span>
          <div className="flex-1 border-t border-border" />
          <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
            {currentPage} / {totalPages}
          </span>
        </motion.div>

        {/* Header */}
        {isLoading ? (
          <SkeletonHeader />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="mb-12"
          >
            <h1 className="text-3xl lg:text-5xl font-mono font-bold tracking-tight uppercase text-balance mb-4">
              Featured<br />
              <span className="text-[#ea580c]">Projects & Work</span>
            </h1>
            <p className="text-xs lg:text-sm font-mono text-muted-foreground max-w-2xl leading-relaxed">
              A collection of projects showcasing expertise in full-stack development, machine learning, and cloud architecture.
            </p>
          </motion.div>
        )}

        {/* Projects Grid */}
        {isLoading ? (
          <SkeletonPortfolioGrid />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          >
            {currentProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5, ease }}
                onClick={() => handleOpenDetail(project)}
                className="group border-2 border-foreground overflow-hidden hover:border-[#ea580c] transition-colors cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-40 bg-foreground/5 overflow-hidden">
                  <Image
                    src={project.image_url}
                    alt={project.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-2 mb-2 pb-2 border-b-2 border-foreground">
                    <div>
                      <h3 className="text-sm font-mono font-bold uppercase tracking-tight">
                        {project.name}
                      </h3>
                      <p className="text-[10px] font-mono text-muted-foreground tracking-widest mt-1">
                        {project.category}
                      </p>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-[#ea580c] bg-[#ea580c]/10 px-2 py-1 whitespace-nowrap">
                      {project.tier}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs font-mono text-muted-foreground mb-3 flex-1 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground border-t-2 border-foreground pt-2">
                    <span>{project.core_skill}</span>
                    <span>{project.skill_count} skills</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Pagination */}
        {!isLoading && totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="flex items-center justify-center gap-4 mt-16 pt-12 border-t-2 border-foreground"
          >
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="flex items-center gap-2 px-4 py-2 border-2 border-foreground text-xs font-mono tracking-widest uppercase disabled:opacity-50 hover:bg-foreground/10 transition-colors"
            >
              <ChevronLeft size={14} />
              Previous
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setCurrentPage(i + 1)
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }}
                  className={`w-8 h-8 font-mono text-xs font-bold transition-colors ${
                    currentPage === i + 1
                      ? "bg-foreground text-background"
                      : "border-2 border-foreground text-foreground hover:bg-foreground/10"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="flex items-center gap-2 px-4 py-2 border-2 border-foreground text-xs font-mono tracking-widest uppercase disabled:opacity-50 hover:bg-foreground/10 transition-colors"
            >
              Next
              <ChevronRight size={14} />
            </button>
          </motion.div>
        )}
      </main>
      <Footer />

      {/* Detail Slide-Over */}
      <SlideOver
        isOpen={selectedProject !== null}
        onClose={handleCloseDetail}
        title={selectedProject?.name || "Project Details"}
        isLoading={isDetailLoading}
      >
        {selectedProject && <PortfolioDetail project={selectedProject} />}
      </SlideOver>
    </div>
  )
}
