"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SkeletonBlogGrid, SkeletonHeader } from "@/components/skeleton-loader"
import { SlideOver } from "@/components/slide-over"
import { BlogDetail } from "@/components/details/blog-detail"
import { blogs } from "@/data/mock-data"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

const ITEMS_PER_PAGE = 6
const ease = [0.22, 1, 0.36, 1] as const

export default function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [blogPosts, setBlogPosts] = useState(blogs)
  const [selectedArticle, setSelectedArticle] = useState<typeof blogs[0] | null>(null)
  const [isDetailLoading, setIsDetailLoading] = useState(false)

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setBlogPosts(blogs)
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  const totalPages = Math.ceil(blogPosts.length / ITEMS_PER_PAGE)
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE
  const endIdx = startIdx + ITEMS_PER_PAGE
  const currentPosts = blogPosts.slice(startIdx, endIdx)

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

  const handleOpenDetail = (article: typeof blogs[0]) => {
    setIsDetailLoading(true)
    // Simulate API call to fetch full article
    setTimeout(() => {
      setSelectedArticle(article)
      setIsDetailLoading(false)
    }, 600)
  }

  const handleCloseDetail = () => {
    setSelectedArticle(null)
  }

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
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
            {"// SECTION: BLOG"}
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
              Technical<br />
              <span className="text-[#ea580c]">Articles & Insights</span>
            </h1>
            <p className="text-xs lg:text-sm font-mono text-muted-foreground max-w-2xl leading-relaxed">
              In-depth guides and tutorials on cloud infrastructure, machine learning, web development, and DevOps practices.
            </p>
          </motion.div>
        )}

        {/* Blog Grid */}
        {isLoading ? (
          <SkeletonBlogGrid />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          >
            {currentPosts.map((post, idx) => (
              <motion.div
                key={post.id}
                onClick={() => handleOpenDetail(post)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5, ease }}
                className="group border-2 border-foreground overflow-hidden hover:border-[#ea580c] transition-all hover:shadow-lg cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-40 bg-foreground/5 overflow-hidden">
                  {post.image_url ? (
                    <Image
                      src={post.image_url}
                      alt={post.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-foreground/10 to-foreground/5">
                      <span className="text-[10px] font-mono text-muted-foreground">NO IMAGE</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col h-full">
                  {/* Category & Date */}
                  <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b-2 border-foreground">
                    <span className="text-[10px] font-mono font-bold text-[#ea580c] bg-[#ea580c]/10 px-2 py-1 uppercase tracking-widest">
                      {post.category.split(".")[0]}
                    </span>
                    <span className="text-[10px] font-mono text-muted-foreground">
                      {formatDate(post.timestamp)}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-sm font-mono font-bold uppercase tracking-tight mb-2 group-hover:text-[#ea580c] transition-colors line-clamp-2">
                    {post.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs font-mono text-muted-foreground flex-1 mb-3 line-clamp-2">
                    {post.description}
                  </p>

                  {/* Author */}
                  <div className="text-[10px] font-mono text-muted-foreground border-t-2 border-foreground pt-2">
                    by {post.author}
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
        isOpen={selectedArticle !== null}
        onClose={handleCloseDetail}
        title={selectedArticle?.name || "Article Details"}
        isLoading={isDetailLoading}
      >
        {selectedArticle && <BlogDetail article={selectedArticle} />}
      </SlideOver>
    </div>
  )
}
