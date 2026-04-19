"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ExternalLink, Github, Globe, MessageCircle, X, ChevronLeft, ChevronRight } from "lucide-react"
import { useChat } from "@/contexts/chat-context"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { fetchPortfolioDetail } from "@/store/actions"

interface PortfolioDetailProps {
  slug: string
}

export function PortfolioDetail({ slug }: PortfolioDetailProps) {
  const { openChat } = useChat()
  const dispatch = useAppDispatch()
  const { portfolioDetail: project, detailLoading: loading, error } = useAppSelector(state => state.portfolio)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    dispatch(fetchPortfolioDetail(slug) as any)
  }, [slug, dispatch])

  // Collect all image URLs
  const allImages = project ? [
    project.image_url,
    project.image2_url,
    project.image3_url,
    project.image4_url,
    project.image5_url,
    project.image6_url,
    project.image7_url,
    project.image8_url,
    project.image9_url,
    project.image10_url,
  ].filter(Boolean) as string[] : []

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1))
  }

  const openImageModal = (index: number) => {
    setSelectedImageIndex(index)
    setIsModalOpen(true)
  }

  const closeImageModal = () => {
    setIsModalOpen(false)
    // Reset to first image when closing
    setTimeout(() => setSelectedImageIndex(0), 300)
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-48 bg-foreground/10 animate-pulse" />
        <div className="h-4 bg-foreground/10 w-3/4 animate-pulse" />
        <div className="h-4 bg-foreground/10 w-1/2 animate-pulse" />
        <div className="space-y-2">
          <div className="h-3 bg-foreground/10 w-full animate-pulse" />
          <div className="h-3 bg-foreground/10 w-full animate-pulse" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center space-y-3">
        <p className="text-xs font-mono text-foreground/60">{error}</p>
        <button
          onClick={() => dispatch(fetchPortfolioDetail(slug) as any)}
          className="px-3 py-2 border border-foreground text-xs font-mono uppercase hover:bg-foreground/10 transition-colors"
        >
          Retry
        </button>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="text-center text-xs font-mono text-foreground/60">
        No project data available
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Image Gallery */}
      {allImages.length > 0 && (
        <div className="space-y-4 border-b-2 border-foreground pb-6">
          {/* Primary Image */}
          <button
            onClick={() => openImageModal(0)}
            className="w-full border-2 border-foreground overflow-hidden aspect-video relative bg-foreground/5 hover:opacity-90 transition-opacity group cursor-pointer"
          >
            <Image
              src={allImages[0]}
              alt={project.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {allImages.length > 1 && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors">
                <span className="text-xs font-mono text-white bg-black/50 px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {allImages.length} images
                </span>
              </div>
            )}
          </button>

          {/* Gallery Grid */}
          {allImages.length > 1 && (
            <div className="grid grid-cols-3 gap-2">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => openImageModal(idx)}
                  className="border-2 border-foreground overflow-hidden aspect-square relative bg-foreground/5 hover:border-[#ea580c] transition-colors group"
                  title={`View image ${idx + 1}`}
                >
                  <Image
                    src={img}
                    alt={`${project.name} ${idx + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-colors text-xs font-mono text-white opacity-0 group-hover:opacity-100">
                    {idx + 1}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Image Modal */}
      {isModalOpen && allImages.length > 0 && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={closeImageModal}
        >
          <motion.div
            key={selectedImageIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-6xl flex flex-col"
          >
            {/* Close Button */}
            <button
              onClick={closeImageModal}
              className="absolute -top-10 right-0 text-white hover:text-[#ea580c] transition-colors z-10"
              title="Close"
            >
              <X size={24} />
            </button>

            {/* Main Image */}
            <div className="relative w-full h-[70vh] border-2 border-foreground overflow-hidden bg-black flex items-center justify-center">
              <Image
                key={`modal-img-${selectedImageIndex}`}
                src={allImages[selectedImageIndex]}
                alt={`${project.name} ${selectedImageIndex + 1}`}
                fill
                className="object-contain"
                priority
                unoptimized
              />
            </div>

            {/* Navigation and Info */}
            <div className="border-t-2 border-foreground bg-background px-4 py-3 flex items-center justify-between">
              {/* Left Navigation */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handlePrevImage()
                }}
                disabled={allImages.length === 1}
                className="p-2 hover:bg-foreground/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Previous image"
              >
                <ChevronLeft size={20} className="text-[#ea580c]" />
              </button>

              {/* Counter and Title */}
              <div className="text-center flex-1">
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                  Image {selectedImageIndex + 1} of {allImages.length}
                </p>
              </div>

              {/* Right Navigation */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleNextImage()
                }}
                disabled={allImages.length === 1}
                className="p-2 hover:bg-foreground/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Next image"
              >
                <ChevronRight size={20} className="text-[#ea580c]" />
              </button>
            </div>

            {/* Thumbnail Strip */}
            {allImages.length > 1 && (
              <div className="border-t-2 border-foreground bg-background px-3 py-3 overflow-x-auto">
                <div className="flex gap-2 min-w-min">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedImageIndex(idx)
                      }}
                      className={`flex-shrink-0 h-12 w-12 border-2 overflow-hidden transition-all relative ${
                        selectedImageIndex === idx ? "border-[#ea580c]" : "border-foreground"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
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
