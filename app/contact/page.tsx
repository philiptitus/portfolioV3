'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Send, Mail, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { submitContactForm, resetContactState } from '@/store/actions'

const ease = [0.22, 1, 0.36, 1] as const

interface FormData {
  name: string
  email: string
  category: string
  other_category?: string
  message: string
}

const categories = [
  'WEB DEVELOPMENT',
  'MACHINE LEARNING',
  'MOBILE APP DEV',
  'DEVOPS & INFRASTRUCTURE',
  'CONSULTING',
  'OTHER',
]

export default function ContactPage() {
  const dispatch = useAppDispatch()
  const { loading, submitted, error } = useAppSelector(state => state.contact)
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    category: 'WEB DEVELOPMENT',
    other_category: '',
    message: '',
  })

  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  // Auto-hide success message after 5 seconds
  useEffect(() => {
    if (submitted) {
      setShowSuccessMessage(true)
      const timer = setTimeout(() => {
        setShowSuccessMessage(false)
        dispatch(resetContactState())
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [submitted, dispatch])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Prepare form data
    const submitData = {
      name: formData.name,
      email: formData.email,
      category: formData.category,
      message: formData.message,
      ...(formData.category === 'OTHER' && formData.other_category && { other_category: formData.other_category }),
    }

    // Dispatch the contact form submission
    dispatch(submitContactForm(submitData) as any)

    // Reset form on successful submission
    if (!error) {
      setFormData({
        name: '',
        email: '',
        category: 'WEB DEVELOPMENT',
        other_category: '',
        message: '',
      })
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

            {/* Success Message */}
            {showSuccessMessage && submitted && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
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

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 border-2 border-red-500 bg-red-500/10 p-4 flex items-start gap-3"
              >
                <AlertCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-mono font-bold text-red-600 uppercase">Error</p>
                  <p className="text-xs font-mono text-red-600 mt-1">{error}</p>
                </div>
              </motion.div>
            )}

            {/* Loading State */}
            {loading && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 border-2 border-[#ea580c] bg-[#ea580c]/10 p-4 flex items-start gap-3"
              >
                <Loader2 size={16} className="text-[#ea580c] flex-shrink-0 mt-0.5 animate-spin" />
                <div>
                  <p className="text-xs font-mono font-bold text-[#ea580c] uppercase">Sending</p>
                  <p className="text-xs font-mono text-muted-foreground mt-1">
                    Please wait while we submit your message...
                  </p>
                </div>
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
                  disabled={loading}
                  className="w-full border border-foreground bg-background text-foreground p-2 text-xs font-mono focus:outline-none focus:border-[#ea580c] transition-colors disabled:opacity-50"
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
                  disabled={loading}
                  className="w-full border border-foreground bg-background text-foreground p-2 text-xs font-mono focus:outline-none focus:border-[#ea580c] transition-colors disabled:opacity-50"
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
                  disabled={loading}
                  className="w-full border border-foreground bg-background text-foreground p-2 text-xs font-mono focus:outline-none focus:border-[#ea580c] transition-colors cursor-pointer disabled:opacity-50"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Other Category Field (conditional) */}
              {formData.category === 'OTHER' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono block mb-2">
                    Please specify (optional)
                  </label>
                  <input
                    type="text"
                    name="other_category"
                    value={formData.other_category || ''}
                    onChange={handleInputChange}
                    disabled={loading}
                    className="w-full border border-foreground bg-background text-foreground p-2 text-xs font-mono focus:outline-none focus:border-[#ea580c] transition-colors disabled:opacity-50"
                    placeholder="e.g., Blockchain Development, Data Science..."
                  />
                </motion.div>
              )}

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
                  disabled={loading}
                  rows={5}
                  className="w-full border border-foreground bg-background text-foreground p-2 text-xs font-mono focus:outline-none focus:border-[#ea580c] transition-colors resize-none disabled:opacity-50"
                  placeholder="Tell me about your project or inquiry..."
                />
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={!loading ? { scale: 1.02 } : {}}
                whileTap={!loading ? { scale: 0.98 } : {}}
                disabled={loading || submitted}
                className="group w-full mt-6 flex items-center gap-0 bg-foreground text-background text-xs font-mono tracking-wider uppercase border-2 border-foreground hover:bg-background hover:text-foreground disabled:opacity-60 transition-colors duration-200"
              >
                <span className="flex items-center justify-center w-10 h-10 bg-[#ea580c]">
                  {loading ? (
                    <Loader2 size={14} strokeWidth={2} className="text-background animate-spin" />
                  ) : (
                    <Send size={14} strokeWidth={2} className="text-background" />
                  )}
                </span>
                <span className="flex-1 py-2.5">
                  {loading ? 'Sending...' : submitted ? 'Message Sent!' : 'Send Message'}
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
                    href="mailto:hi@filipio.com"
                    className="text-xs font-mono text-muted-foreground hover:text-[#ea580c] transition-colors"
                  >
                    hi@filipio.com
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
