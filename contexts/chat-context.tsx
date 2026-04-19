'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { useAppDispatch } from '@/store/hooks'
import { sendChatMessage } from '@/store/actions'

interface ChatContextType {
  isOpen: boolean
  initialMessage: string | undefined
  openChat: (message?: string) => void
  closeChat: () => void
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export function ChatProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [initialMessage, setInitialMessage] = useState<string | undefined>()
  const dispatch = useAppDispatch()

  const openChat = (message?: string) => {
    setInitialMessage(message)
    setIsOpen(true)
    
    // Immediately send the message if provided
    if (message) {
      dispatch(sendChatMessage(message) as any)
    }
  }

  const closeChat = () => {
    setIsOpen(false)
  }

  return (
    <ChatContext.Provider value={{ isOpen, initialMessage, openChat, closeChat }}>
      {children}
    </ChatContext.Provider>
  )
}

export function useChat() {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error('useChat must be used within ChatProvider')
  }
  return context
}
