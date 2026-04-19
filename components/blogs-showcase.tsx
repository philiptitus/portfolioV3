"use client"

import { motion } from "framer-motion"
import { Blog } from "@/data/mock-data"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

const ease = [0.22, 1, 0.36, 1] as const

interface BlogsShowcaseProps {
  blogs: Blog[]
  onBlogClick?: (blog: Blog) => void
}

export function BlogsShowcase({ blogs, onBlogClick }: BlogsShowcaseProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: 0.5, ease }}
        className="mb-8"
      >
        <h3 className="text-xl lg:text-2xl font-mono font-bold uppercase tracking-tight text-balance mb-2">
          Latest <span className="text-[#ea580c]">Articles & Insights</span>
        </h3>
        <p className="text-xs lg:text-sm font-mono text-muted-foreground">
          Technical writing on cloud infrastructure, AI/ML, and web development.
        </p>
      </motion.div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs.map((blog, i) => (
          <motion.article
            key={blog.id}
            onClick={() => onBlogClick?.(blog)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ delay: i * 0.1, duration: 0.5, ease }}
            className="flex flex-col border-2 border-foreground overflow-hidden hover:bg-foreground/5 transition-colors duration-200 h-full cursor-pointer hover:border-[#ea580c]"
          >
            {/* Image */}
            {(blog.image_url || blog.png_url) && (
              <div className="relative w-full h-40 bg-foreground/10 border-b-2 border-foreground overflow-hidden">
                <Image
                  src={blog.image_url || blog.png_url || ""}
                  alt={blog.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            )}

            {/* Content */}
            <div className="flex flex-col flex-1 p-4 lg:p-5 space-y-3">
              {/* Category Tag */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] tracking-[0.15em] uppercase text-[#ea580c] font-mono font-bold">
                  {blog.category.split(".")[0]}
                </span>
                <span className="text-[10px] tracking-widest uppercase text-muted-foreground font-mono">
                  {new Date(blog.timestamp).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>

              {/* Title */}
              <h4 className="text-sm lg:text-base font-mono font-bold uppercase tracking-tight leading-tight text-balance">
                {blog.name}
              </h4>

              {/* Description */}
              <p className="text-xs lg:text-sm font-mono text-muted-foreground flex-1 leading-relaxed line-clamp-2">
                {blog.description}
              </p>

              {/* Read More Link */}
              <motion.a
                href={`/blog/${blog.slug}`}
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="flex items-center gap-2 text-xs uppercase tracking-widest font-mono text-muted-foreground hover:text-foreground transition-colors duration-200 group pt-2 border-t border-foreground/20"
              >
                <span>Read Article</span>
                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  )
}
