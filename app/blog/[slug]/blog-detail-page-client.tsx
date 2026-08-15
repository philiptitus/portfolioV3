"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronLeft } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BlogDetail } from "@/components/details/blog-detail"
import type { BlogDetail as BlogDetailType } from "@/store/types"

const ease = [0.22, 1, 0.36, 1] as const

export default function BlogDetailPageClient({ article }: { article: BlogDetailType }) {
  return (
    <div className="min-h-screen dot-grid-bg flex flex-col">
      <Navbar />
      <main className="flex-1 w-full px-6 py-20 lg:px-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease }}
          className="max-w-3xl mx-auto mb-8"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:text-[#ea580c] font-mono transition-colors"
          >
            <ChevronLeft size={12} />
            All Articles
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="max-w-3xl mx-auto"
        >
          <BlogDetail slug={article.slug} article={article} />
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
