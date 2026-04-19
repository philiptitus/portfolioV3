'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as const

export default function NotFound() {
  return (
    <div className="min-h-screen dot-grid-bg flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
        className="max-w-2xl w-full"
      >
        {/* Header */}
        <div className="border-2 border-foreground p-6 lg:p-8 mb-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5, ease }}
            className="flex items-baseline gap-4 mb-6"
          >
            <span className="text-6xl lg:text-8xl font-pixel tracking-tighter text-foreground font-bold">
              404
            </span>
            <div className="border-l-2 border-foreground pl-4">
              <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground font-mono block mb-1">
                ERROR_CODE
              </span>
              <span className="text-sm font-mono text-foreground">PAGE_NOT_FOUND</span>
            </div>
          </motion.div>

          {/* Error message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5, ease }}
            className="mb-8 space-y-4"
          >
            <h1 className="text-2xl lg:text-3xl font-mono font-bold uppercase tracking-tight text-balance">
              Page not found
              <br />
              <span className="text-[#ea580c]">404 Error</span>
            </h1>
            <p className="text-xs lg:text-sm font-mono text-muted-foreground leading-relaxed max-w-lg">
              The page you're looking for doesn't exist or has been moved. It might have been relocated, or the URL might be incorrect. Let's get you back on track.
            </p>
          </motion.div>

          {/* System info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5, ease }}
            className="border-t-2 border-foreground pt-4 mb-8"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono mb-2">
                  Status
                </p>
                <p className="text-xs font-mono text-foreground">404 Not Found</p>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono mb-2">
                  Timestamp
                </p>
                <p className="text-xs font-mono text-foreground">{new Date().toISOString().split('T')[0]}</p>
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5, ease }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group w-full flex items-center gap-0 bg-foreground text-background text-xs font-mono tracking-wider uppercase border-2 border-foreground hover:bg-background hover:text-foreground transition-colors"
              >
                <span className="flex items-center justify-center w-10 h-10 bg-[#ea580c]">
                  <ArrowRight size={14} strokeWidth={2} className="text-background" />
                </span>
                <span className="flex-1 py-2.5">Back Home</span>
              </motion.button>
            </Link>
            <Link href="/portfolio">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-2.5 border-2 border-foreground text-foreground text-xs font-mono tracking-wider uppercase hover:bg-foreground/10 transition-colors"
              >
                View Portfolio
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* ASCII Art */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6, ease }}
          className="border-2 border-foreground p-4 lg:p-6 bg-background font-mono text-[8px] lg:text-[10px] text-muted-foreground overflow-x-auto"
        >
          <pre className="whitespace-pre text-center">
            {`
  ┌─────────────────────────────────┐
  │                                 │
  │    > System error detected      │
  │    > Initializing recovery...   │
  │                                 │
  │    [████████░░░░░░░░] 65%      │
  │                                 │
  │    > Try navigating elsewhere   │
  │    > Or contact support         │
  │                                 │
  └─────────────────────────────────┘
            `}
          </pre>
        </motion.div>
      </motion.div>
    </div>
  )
}
