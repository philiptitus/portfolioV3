"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { ReactNode } from "react"

interface SlideOverProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
  isLoading?: boolean
}

export function SlideOver({ isOpen, onClose, title, children, isLoading = false }: SlideOverProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-40"
          />

          {/* Slide-over panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-0 top-0 h-full w-full sm:w-[600px] z-50 bg-background border-l-2 border-foreground flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b-2 border-foreground px-6 py-4 shrink-0">
              <h2 className="text-xl font-mono font-bold uppercase tracking-tight text-foreground text-balance">
                {title}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-foreground/10 transition-colors rounded-sm"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {isLoading ? (
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-foreground/10 rounded animate-pulse" />
                  <div className="h-4 bg-foreground/10 rounded animate-pulse w-5/6" />
                  <div className="h-4 bg-foreground/10 rounded animate-pulse w-4/6" />
                </div>
              ) : (
                <div className="p-6">{children}</div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
