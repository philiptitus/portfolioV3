"use client"

import { motion } from "framer-motion"
import { Job } from "@/data/mock-data"
import { ExternalLink, Briefcase } from "lucide-react"

const ease = [0.22, 1, 0.36, 1] as const

interface ExperienceSectionProps {
  jobs: Job[]
  onJobClick?: (job: Job) => void
}

export function ExperienceSection({ jobs, onJobClick }: ExperienceSectionProps) {
  const currentJob = jobs.find((j) => j.is_current)
  const pastJobs = jobs.filter((j) => !j.is_current)

  return (
    <section className="w-full px-6 py-20 lg:px-12">
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease }}
        className="flex items-center gap-4 mb-8"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
          {"// SECTION: EXPERIENCE"}
        </span>
        <div className="flex-1 border-t border-border" />
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
          007
        </span>
      </motion.div>

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease }}
        className="mb-12"
      >
        <h2 className="text-2xl lg:text-3xl font-mono font-bold tracking-tight uppercase text-balance">
          Professional<br />
          <span className="text-[#ea580c]">Experience</span>
        </h2>
        <p className="text-xs lg:text-sm font-mono text-muted-foreground mt-3 max-w-md">
          Full-stack engineer with experience across startups, enterprises, and freelance projects. 5+ years building production systems and leading teams.
        </p>
      </motion.div>

      <div className="space-y-4">
        {/* Current Job - Featured */}
        {currentJob && (
          <motion.div
            onClick={() => onJobClick?.(currentJob)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease }}
            className="border-2 border-[#ea580c] bg-foreground/5 p-6 cursor-pointer hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-start gap-3">
                <Briefcase size={16} className="mt-1 text-[#ea580c] flex-shrink-0" />
                <div>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-[#ea580c] font-mono font-bold">
                    CURRENT ROLE
                  </p>
                  <h3 className="text-lg font-mono font-bold mt-1">{currentJob.job_title}</h3>
                  <p className="text-sm font-mono text-muted-foreground mt-1">
                    {currentJob.company_name} • {currentJob.location}
                  </p>
                </div>
              </div>
              {currentJob.url && (
                <a
                  href={currentJob.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-[#ea580c] transition-colors"
                >
                  <ExternalLink size={16} />
                </a>
              )}
            </div>
            <p className="text-xs lg:text-sm font-mono text-muted-foreground leading-relaxed">
              Since {new Date(currentJob.start_date).toLocaleDateString("en-US", { year: "numeric", month: "short" })}
            </p>
          </motion.div>
        )}

        {/* Past Jobs */}
        {pastJobs.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5, ease }}
            className="space-y-3"
          >
            {pastJobs.map((job, idx) => {
              const startDate = new Date(job.start_date)
              const endDate = job.end_date ? new Date(job.end_date) : null
              const durationMonths = endDate
                ? Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 30))
                : Math.round((new Date().getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 30))

              return (
                <motion.div
                  key={job.id}
                  onClick={() => onJobClick?.(job)}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08, duration: 0.5, ease }}
                  className="block border border-foreground/40 hover:border-foreground/80 p-4 transition-colors cursor-pointer hover:bg-foreground/5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1">
                      <Briefcase size={14} className="mt-1 text-muted-foreground flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-mono font-bold">{job.job_title}</h4>
                        <p className="text-xs font-mono text-muted-foreground mt-1">
                          {job.company_name} • {job.location}
                        </p>
                        <p className="text-[10px] font-mono text-muted-foreground mt-2">
                          {durationMonths} months
                        </p>
                      </div>
                    </div>
                    <ExternalLink size={14} className="mt-1 text-muted-foreground flex-shrink-0" />
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        )}
      </div>
    </section>
  )
}
