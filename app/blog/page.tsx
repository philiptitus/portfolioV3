"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SkeletonBlogGrid, SkeletonHeader } from "@/components/skeleton-loader"
import { SlideOver } from "@/components/slide-over"
import { BlogDetail } from "@/components/details/blog-detail"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { fetchBlogs } from "@/store/actions"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

const ease = [0.22, 1, 0.36, 1] as const

export default function BlogPage() {
  const dispatch = useAppDispatch()
  const { blogs, listLoading, error, pagination } = useAppSelector(state => state.blog)
  
  const [selectedArticleSlug, setSelectedArticleSlug] = useState<string | null>(null)

  useEffect(() => {
    dispatch(fetchBlogs() as any)
  }, [dispatch])

  const handlePrevPage = () => {
    if (pagination.previous) {
      dispatch(fetchBlogs(pagination.previous) as any)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handleNextPage = () => {
    if (pagination.next) {
      dispatch(fetchBlogs(pagination.next) as any)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handleOpenDetail = (article: typeof blogs[0]) => {
    setSelectedArticleSlug(article.slug)
  }

  const handleCloseDetail = () => {
    setSelectedArticleSlug(null)
  }

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  if (error) {
    return (
      <div className="min-h-screen dot-grid-bg flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Unable to Load Blogs</h2>
            <p className="text-muted-foreground mb-4">{error}</p>
            <button
              onClick={() => dispatch(fetchBlogs() as any)}
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
            Total: {pagination.count}
          </span>
        </motion.div>

        {/* Header */}
        {listLoading ? (
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
        {listLoading ? (
          <SkeletonBlogGrid />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          >
            {blogs.map((article, idx) => (
              <motion.div
                key={article.id}
                onClick={() => handleOpenDetail(article)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5, ease }}
                className="group border-2 border-foreground overflow-hidden hover:border-[#ea580c] transition-all hover:shadow-lg cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-40 bg-foreground/5 overflow-hidden">
                  {article.image_url ? (
                    <Image
                      src={article.image_url}
                      alt={article.name}
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
                      {article.category.split(".")[0]}
                    </span>
                    <span className="text-[10px] font-mono text-muted-foreground">
                      {formatDate(article.timestamp)}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-sm font-mono font-bold uppercase tracking-tight mb-2 group-hover:text-[#ea580c] transition-colors line-clamp-2">
                    {article.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs font-mono text-muted-foreground flex-1 mb-3 line-clamp-2">
                    {article.description}
                  </p>

                  {/* Author */}
                  <div className="text-[10px] font-mono text-muted-foreground border-t-2 border-foreground pt-2">
                    by {article.author}
                  </div>
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
            className="flex items-center justify-center gap-4 mt-16 pt-12 border-t-2 border-foreground"
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
                {blogs.length} items shown of {pagination.count}
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
      </main>
      <Footer />

      {/* Detail Slide-Over */}
      <SlideOver
        isOpen={selectedArticleSlug !== null}
        onClose={handleCloseDetail}
        title="Article Details"
      >
        {selectedArticleSlug && <BlogDetail slug={selectedArticleSlug} />}
      </SlideOver>
    </div>
  )
}
