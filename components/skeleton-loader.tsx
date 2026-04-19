"use client"

import { motion } from "framer-motion"

export function SkeletonCard() {
  return (
    <motion.div
      initial={{ opacity: 0.6 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
      className="border-2 border-foreground p-4"
    >
      <div className="space-y-4">
        <div className="h-40 bg-foreground/10" />
        <div className="h-4 bg-foreground/10 w-3/4" />
        <div className="h-4 bg-foreground/10 w-1/2" />
        <div className="flex gap-2">
          <div className="h-6 bg-foreground/10 flex-1" />
          <div className="h-6 bg-foreground/10 flex-1" />
        </div>
      </div>
    </motion.div>
  )
}

export function SkeletonPortfolioGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}

export function SkeletonBlogCard() {
  return (
    <motion.div
      initial={{ opacity: 0.6 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
      className="border-2 border-foreground overflow-hidden"
    >
      <div className="h-40 bg-foreground/10" />
      <div className="p-4 space-y-3">
        <div className="h-3 bg-foreground/10 w-1/3" />
        <div className="h-4 bg-foreground/10 w-full" />
        <div className="h-4 bg-foreground/10 w-5/6" />
        <div className="h-3 bg-foreground/10 w-1/4 mt-4" />
      </div>
    </motion.div>
  )
}

export function SkeletonBlogGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonBlogCard key={i} />
      ))}
    </div>
  )
}

export function SkeletonHeader() {
  return (
    <motion.div
      initial={{ opacity: 0.6 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
      className="space-y-4 mb-12"
    >
      <div className="h-8 bg-foreground/10 w-1/3" />
      <div className="h-4 bg-foreground/10 w-2/3" />
    </motion.div>
  )
}

export const SkeletonLoader = {
  Card: SkeletonCard,
  Portfolio: SkeletonPortfolioGrid,
  Blog: SkeletonBlogGrid,
  Header: SkeletonHeader,
  Certificate: function SkeletonCertificate() {
    return (
      <motion.div
        initial={{ opacity: 0.6 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="border-2 border-foreground overflow-hidden"
      >
        <div className="h-48 bg-foreground/10" />
        <div className="p-4 space-y-3 border-t-2 border-foreground">
          <div className="h-3 bg-foreground/10 w-1/3" />
          <div className="h-4 bg-foreground/10 w-full" />
          <div className="h-3 bg-foreground/10 w-1/4 mt-4" />
        </div>
      </motion.div>
    )
  },
}
