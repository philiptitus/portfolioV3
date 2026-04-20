"use client"

import { useEffect, useRef } from "react"
import { Send, AlertCircle, RotateCcw } from "lucide-react"
import React from "react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { sendChatMessage, loadChatbotSession, clearChatMessages } from "@/store/actions"
import { ChatMessage } from "@/store/types"

interface TerminalCardProps {
  isModal?: boolean
  initialMessage?: string
}

// Helper function to format message content with clickable links
const formatMessageContent = (content: string): (string | React.ReactElement)[] | string => {
  // Replace markdown-style links [text](url) with HTML links
  const parts: (string | React.ReactElement)[] = []
  let lastIndex = 0
  
  // Regex to match markdown links: [text](url)
  const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
  let match
  
  while ((match = markdownLinkRegex.exec(content)) !== null) {
    // Add text before the link
    if (match.index > lastIndex) {
      parts.push(content.substring(lastIndex, match.index))
    }
    
    // Add the link
    const linkText = match[1]
    const url = match[2]
    parts.push(
      <a
        key={match.index}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#ea580c] hover:text-[#f97316] underline underline-offset-2"
      >
        {linkText}
      </a>
    )
    
    lastIndex = match.index + match[0].length
  }
  
  // Add remaining text after the last link
  if (lastIndex < content.length) {
    parts.push(content.substring(lastIndex))
  }
  
  // If no links were found, return the original content
  return parts.length > 0 ? parts : content
}

export function TerminalCard({ isModal = false, initialMessage }: TerminalCardProps) {
  const dispatch = useAppDispatch()
  const { messages, loading, error, sessionId } = useAppSelector(state => state.chatbot)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Load session on mount
  useEffect(() => {
    dispatch(loadChatbotSession() as any)
  }, [dispatch])

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    const input = inputRef.current?.value.trim()
    if (!input || loading) return

    dispatch(sendChatMessage(input) as any)
    if (inputRef.current) {
      inputRef.current.value = ""
      inputRef.current.focus()
    }
  }

  const handleClearSession = () => {
    dispatch(clearChatMessages())
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const containerHeight = isModal ? "h-96" : "h-full"

  return (
    <div className={`flex flex-col ${containerHeight}`}>
      {/* Header */}
      <div className="flex items-center gap-2 border-b-2 border-foreground px-4 py-2 bg-background">
        <span className="h-2 w-2 bg-[#ea580c] rounded-full" />
        <span className="h-2 w-2 bg-foreground rounded-full" />
        <span className="h-2 w-2 border border-foreground rounded-full" />
        <span className="ml-auto text-[10px] tracking-widest text-muted-foreground uppercase font-mono">
          {sessionId ? "philip.ai [SESSION]" : "philip.ai"}
        </span>
        <button
          onClick={handleClearSession}
          disabled={loading}
          className="p-1 hover:bg-foreground/10 disabled:opacity-50 transition-colors group"
          title="New Session"
        >
          <RotateCcw size={12} className="text-muted-foreground group-hover:text-[#ea580c] transition-colors" />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 bg-foreground p-4 overflow-y-auto flex flex-col font-mono">
        <div className="flex flex-col gap-2">
          {messages.length === 0 && !loading && (
            <div className="text-xs text-background/60 mb-4">
              <p className="mb-2">$ ready for input</p>
              <p className="text-[#ea580c]"> Ask me about my projects, skills, or experience</p>
            </div>
          )}

          {messages.map((msg: ChatMessage, i: number) => (
            <div key={i} className={`text-xs whitespace-pre-wrap break-words ${
              msg.role === "user"
                ? "text-[#ea580c] text-right"
                : msg.role === "system"
                ? "text-red-400 text-left"
                : "text-background text-left"
            }`}>
              <span>
                {msg.role === "user" && "> "}
                {msg.role === "assistant" && "$ "}
                {msg.role === "system" && "⚠ "}
              </span>
              <span>{formatMessageContent(msg.content)}</span>
            </div>
          ))}

          {/* Loading state */}
          {loading && (
            <div className="text-xs text-background font-mono">
              $ <span className="inline-block animate-pulse">█</span>
            </div>
          )}

          {/* Error state */}
          {error && !loading && (
            <div className="text-xs text-red-400 font-mono mt-2 p-2 border border-red-400 bg-red-400/10">
              <div className="flex items-start gap-2">
                <AlertCircle size={12} className="flex-shrink-0 mt-0.5" />
                <div>{error}</div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <form onSubmit={handleSend} className="border-t-2 border-foreground bg-foreground p-3 flex items-center gap-2">
        <span className="text-[#ea580c] font-mono text-xs flex-shrink-0">{">"}</span>
        <input
          ref={inputRef}
          type="text"
          placeholder="Type your message..."
          disabled={loading}
          className="flex-1 bg-transparent text-background font-mono text-xs outline-none placeholder:text-background/40 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={loading}
          className="p-1 hover:bg-background/20 disabled:opacity-50 transition-colors"
        >
          <Send size={14} className="text-background" />
        </button>
      </form>
    </div>
  )
}
