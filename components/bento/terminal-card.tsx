"use client"

import { useEffect, useState, useRef } from "react"
import { Send } from "lucide-react"

const INITIAL_MESSAGES = [
  { role: "user", text: "Hi, tell me about your experience" },
  { role: "bot", text: "I'm a Software Engineer & ML specialist with 5+ years building scalable systems." },
  { role: "user", text: "What's your tech stack?" },
  { role: "bot", text: "Primary: Python, JavaScript, React. Cloud: AWS, GCP. ML: TensorFlow, PyTorch." },
  { role: "user", text: "Interested in collaborating?" },
  { role: "bot", text: "Absolutely! Let's build something amazing. Contact me for details." },
]

interface Message {
  role: "user" | "bot"
  text: string
}

interface TerminalCardProps {
  isModal?: boolean
  initialMessage?: string
}

export function TerminalCard({ isModal = false, initialMessage }: TerminalCardProps) {
  const initialMessages = initialMessage 
    ? [
        { role: "user" as const, text: initialMessage },
        { role: "bot" as const, text: "I'd be happy to help! Let me provide you with detailed information." },
      ]
    : INITIAL_MESSAGES
  
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = { role: "user", text: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate bot response delay
    setTimeout(() => {
      const botResponses = [
        "That's an interesting question. I'd love to discuss this further!",
        "Great point! I have experience with that technology.",
        "Let me know more about what you're working on.",
        "Absolutely! I'm available for projects like that.",
        "I've worked on similar challenges before. Tell me more!",
      ]
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)]
      const botMessage: Message = { role: "bot", text: randomResponse }
      setMessages((prev) => [...prev, botMessage])
      setIsLoading(false)
    }, 800)
  }

  const containerHeight = isModal ? "h-96" : "h-full"

  return (
    <div className={`flex flex-col ${containerHeight}`}>
      <div className="flex items-center gap-2 border-b-2 border-foreground px-4 py-2">
        <span className="h-2 w-2 bg-[#ea580c]" />
        <span className="h-2 w-2 bg-foreground" />
        <span className="h-2 w-2 border border-foreground" />
        <span className="ml-auto text-[10px] tracking-widest text-muted-foreground uppercase">
          philip.ai
        </span>
      </div>
      <div className="flex-1 bg-foreground p-4 overflow-y-auto flex flex-col justify-end">
        <div className="flex flex-col gap-2 mb-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`text-xs font-mono ${
                msg.role === "user"
                  ? "text-[#ea580c] text-right"
                  : "text-background text-left"
              }`}
              style={{ opacity: 0.9 }}
            >
              <span>
                {msg.role === "user" ? "> " : "$ "}
                {msg.text}
              </span>
            </div>
          ))}
          {isLoading && (
            <span className="text-xs text-background font-mono">$ <span className="animate-blink">_</span></span>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      {/* Input area */}
      <div className="border-t-2 border-foreground bg-foreground p-3 flex items-center gap-2">
        <span className="text-[#ea580c] font-mono text-xs">{">"}</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type your message..."
          className="flex-1 bg-transparent text-background font-mono text-xs outline-none placeholder:text-background/40"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
          className="p-1 hover:bg-background/20 disabled:opacity-50 transition-colors"
        >
          <Send size={14} className="text-background" />
        </button>
      </div>
    </div>
  )
}
