"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, MessageCircle } from "lucide-react"
import { TerminalCard } from "@/components/bento/terminal-card"
import { useChat } from "@/contexts/chat-context"

export function FloatingChatButton() {
  const { isOpen, openChat, closeChat, initialMessage } = useChat()

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
        onClick={() => openChat()}
        className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 bg-[#ea580c] text-background border-2 border-[#ea580c] hover:bg-[#ea580c]/90 transition-all duration-200"
        title="Open chat"
      >
        <MessageCircle size={24} strokeWidth={2} />
      </motion.button>

      {/* Modal Backdrop and Chatbot */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeChat}
              className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
            />

            {/* Chat Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-32px)] border-2 border-foreground bg-background overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b-2 border-foreground bg-background">
                <span className="text-xs font-mono font-bold tracking-widest uppercase">
                  Philip.AI Chat
                </span>
                <button
                  onClick={closeChat}
                  className="p-1 hover:bg-foreground/10 transition-colors"
                >
                  <X size={16} className="text-foreground" />
                </button>
              </div>

              {/* Terminal Card */}
              <TerminalCard isModal={true} initialMessage={initialMessage} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
