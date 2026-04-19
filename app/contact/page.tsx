'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Send, Mail, CheckCircle } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as const

interface FormData {
  name: string
  email: string
  category: string
  message: string
}

const categories = [
  'WEB DEVELOPMENT',
  'MACHINE LEARNING',
  'DEVOPS & INFRASTRUCTURE',
  'CONSULTING',
  'OTHER',
]

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    category: 'WEB DEVELOPMENT',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1200))

      // Here you would normally call your API endpoint
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // })

      setSubmitted(true)
      setFormData({ name: '', email: '', category: 'WEB DEVELOPMENT', message: '' })

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000)
    } catch (err) {
      setError('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen dot-grid-bg">
      <Navbar />
      <main className="w-full px-6 py-12 lg:px-12 lg:py-16">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
              {'// SECTION: GET_IN_TOUCH'}
            </span>
            <div className="flex-1 border-t border-border" />
          </div>

          <h1 className="text-3xl lg:text-4xl font-mono font-bold tracking-tight uppercase mb-4 text-balance">
            Let&apos;s
            <br />
            <span className="text-[#ea580c]">Work Together</span>
          </h1>
          <p className="text-xs lg:text-sm font-mono text-muted-foreground leading-relaxed max-w-2xl">
            Have a project in mind? Need technical consultation? Or just want to chat about technology? I&apos;d love to hear from you. Send me a message and let&apos;s explore what we can build together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease }}
            className="border-2 border-foreground p-6 lg:p-8"
          >
            <h2 className="text-lg lg:text-xl font-mono font-bold uppercase mb-6 text-foreground">
              Send Message
            </h2>

            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 border-2 border-[#ea580c] bg-[#ea580c]/10 p-4 flex items-start gap-3"
              >
                <CheckCircle size={16} className="text-[#ea580c] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-mono font-bold text-[#ea580c] uppercase">Success</p>
                  <p className="text-xs font-mono text-muted-foreground mt-1">
                    Your message has been received. I&apos;ll get back to you soon!
                  </p>
                </div>
              </motion.div>
            )}

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 border-2 border-red-500 bg-red-500/10 p-4"
              >
                <p className="text-xs font-mono text-red-600">{error}</p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono block mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-foreground bg-background text-foreground p-2 text-xs font-mono focus:outline-none focus:border-[#ea580c] transition-colors"
                  placeholder="John Doe"
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono block mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-foreground bg-background text-foreground p-2 text-xs font-mono focus:outline-none focus:border-[#ea580c] transition-colors"
                  placeholder="you@example.com"
                />
              </div>

              {/* Category */}
              <div>
                <label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono block mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full border border-foreground bg-background text-foreground p-2 text-xs font-mono focus:outline-none focus:border-[#ea580c] transition-colors cursor-pointer"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono block mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full border border-foreground bg-background text-foreground p-2 text-xs font-mono focus:outline-none focus:border-[#ea580c] transition-colors resize-none"
                  placeholder="Tell me about your project or inquiry..."
                />
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting || submitted}
                className="group w-full mt-6 flex items-center gap-0 bg-foreground text-background text-xs font-mono tracking-wider uppercase border-2 border-foreground hover:bg-background hover:text-foreground disabled:opacity-60 transition-colors duration-200"
              >
                <span className="flex items-center justify-center w-10 h-10 bg-[#ea580c]">
                  <Send size={14} strokeWidth={2} className="text-background" />
                </span>
                <span className="flex-1 py-2.5">
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </span>
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease }}
            className="space-y-6"
          >
            {/* Email Card */}
            <div className="border-2 border-foreground p-6">
              <div className="flex items-start gap-4">
                <Mail size={20} className="text-[#ea580c] flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="text-sm font-mono font-bold uppercase text-foreground mb-2">
                    Email
                  </h3>
                  <a
                    href="mailto:mrptjobs@gmail.com"
                    className="text-xs font-mono text-muted-foreground hover:text-[#ea580c] transition-colors"
                  >
                    mrptjobs@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Info */}
            <div className="border-2 border-foreground p-6 space-y-4">
              <h3 className="text-sm font-mono font-bold uppercase text-foreground">
                Response Time
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono mb-1">
                    Typical
                  </p>
                  <p className="text-xs font-mono text-foreground">24-48 hours</p>
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono mb-1">
                    Urgent (Business)
                  </p>
                  <p className="text-xs font-mono text-foreground">Same day</p>
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className="border-2 border-foreground p-6">
              <h3 className="text-sm font-mono font-bold uppercase text-foreground mb-4">
                Currently
              </h3>
              <div className="flex items-center gap-2 mb-4">
                <span className="h-2 w-2 bg-[#ea580c] rounded-full animate-pulse" />
                <span className="text-xs font-mono text-foreground">
                  Available for new projects
                </span>
              </div>
              <ul className="text-xs font-mono text-muted-foreground space-y-2">
                <li>• Full-stack development</li>
                <li>• ML/AI projects</li>
                <li>• Technical consulting</li>
                <li>• Architecture design</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
