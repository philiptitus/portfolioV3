"use client"

import { useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Calendar, User, MessageCircle } from "lucide-react"
import { useChat } from "@/contexts/chat-context"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { fetchBlogDetail } from "@/store/actions"

interface BlogDetailProps {
  slug: string
}

export function BlogDetail({ slug }: BlogDetailProps) {
  const { openChat } = useChat()
  const dispatch = useAppDispatch()
  const { blogDetail: article, detailLoading: loading, error } = useAppSelector(state => state.blog)

  useEffect(() => {
    dispatch(fetchBlogDetail(slug) as any)
  }, [slug, dispatch])

  const formattedDate = article?.timestamp
    ? new Date(article.timestamp).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : ""

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-48 bg-foreground/10 animate-pulse" />
        <div className="h-4 bg-foreground/10 w-3/4 animate-pulse" />
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
          onClick={() => dispatch(fetchBlogDetail(slug) as any)}
          className="px-3 py-2 border border-foreground text-xs font-mono uppercase hover:bg-foreground/10 transition-colors"
        >
          Retry
        </button>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="text-center text-xs font-mono text-foreground/60">
        No article data available
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
      {/* Article Image */}
      {article.image_url && (
        <div className="border-2 border-foreground overflow-hidden aspect-video relative bg-foreground/5">
          <Image
            src={article.image_url}
            alt={article.name}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Article Meta */}
      <div className="space-y-3 border-b-2 border-foreground pb-4">
        <h2 className="text-lg font-mono font-bold uppercase tracking-tight">
          {article.name}
        </h2>

        {(article.timestamp || article.author || article.category) && (
          <div className="flex flex-wrap gap-4 text-xs font-mono">
            {article.timestamp && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <Calendar size={12} />
                {formattedDate}
              </div>
            )}
            {article.author && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <User size={12} />
                {article.author}
              </div>
            )}
            {article.category && (
              <span className="text-[#ea580c] uppercase tracking-widest font-bold">
                {article.category}
              </span>
            )}
          </div>
        )}

        {article.description && (
          <p className="text-sm font-mono text-foreground/75 leading-relaxed">
            {article.description}
          </p>
        )}
      </div>

      {/* Article Body */}
      {article.body && (
        <div className="space-y-4">
          <div
            className="prose prose-invert prose-sm max-w-none font-mono text-xs text-foreground/80 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: article.body }}
          />
        </div>
      )}

      {/* Additional Image if available */}
      {article.png_url && (
        <div className="border-t-2 border-foreground pt-4">
          <div className="border-2 border-foreground overflow-hidden aspect-video relative bg-foreground/5">
            {article.png_url && (
              <Image
                src={article.png_url}
                alt={`${article.name} supplementary`}
                fill
                className="object-cover"
              />
            )}
          </div>
        </div>
      )}

      {/* Ask AI Button */}
      <div className="border-t-2 border-foreground pt-4">
        <button
          onClick={() => openChat(`Tell me about this blog article: ${article.name}`)}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 border-2 border-[#ea580c] bg-[#ea580c]/10 text-[#ea580c] text-xs font-mono uppercase tracking-widest hover:bg-[#ea580c]/20 transition-colors"
        >
          <MessageCircle size={14} />
          Ask AI
        </button>
      </div>
    </motion.div>
  )
}
