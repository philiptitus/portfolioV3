"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { FeatureGrid } from "@/components/feature-grid"
import { AboutSection } from "@/components/about-section"
import { PricingSection } from "@/components/pricing-section"
import { ExperienceSection } from "@/components/experience-section"
import { GlitchMarquee } from "@/components/glitch-marquee"
import { Footer } from "@/components/footer"
import { SlideOver } from "@/components/slide-over"
import { ExperienceDetail } from "@/components/details/experience-detail"
import { PortfolioDetail } from "@/components/details/portfolio-detail"
import { BlogDetail } from "@/components/details/blog-detail"
import { jobs, keySkills, blogs, portfolioProjects } from "@/data/mock-data"

export default function Page() {
  const [selectedJob, setSelectedJob] = useState<typeof jobs[0] | null>(null)
  const [selectedProject, setSelectedProject] = useState<typeof portfolioProjects[0] | null>(null)
  const [selectedBlog, setSelectedBlog] = useState<typeof blogs[0] | null>(null)
  const [isDetailLoading, setIsDetailLoading] = useState(false)

  const handleOpenJobDetail = (job: typeof jobs[0]) => {
    setIsDetailLoading(true)
    setTimeout(() => {
      setSelectedJob(job)
      setIsDetailLoading(false)
    }, 600)
  }

  const handleOpenProjectDetail = (project: typeof portfolioProjects[0]) => {
    setIsDetailLoading(true)
    setTimeout(() => {
      setSelectedProject(project)
      setIsDetailLoading(false)
    }, 600)
  }

  const handleOpenBlogDetail = (blog: typeof blogs[0]) => {
    setIsDetailLoading(true)
    setTimeout(() => {
      setSelectedBlog(blog)
      setIsDetailLoading(false)
    }, 600)
  }

  const handleCloseDetail = () => {
    setSelectedJob(null)
    setSelectedProject(null)
    setSelectedBlog(null)
  }

  return (
    <div className="min-h-screen dot-grid-bg">
      <Navbar />
      <main>
        <HeroSection />
        <FeatureGrid onPortfolioClick={handleOpenProjectDetail} />
        <AboutSection />
        <ExperienceSection jobs={jobs} onJobClick={handleOpenJobDetail} />
        <GlitchMarquee skills={keySkills} />
        <PricingSection blogs={blogs} onBlogClick={handleOpenBlogDetail} />
      </main>
      <Footer />

      {/* Job Detail Slide-Over */}
      <SlideOver
        isOpen={selectedJob !== null}
        onClose={handleCloseDetail}
        title={selectedJob?.job_title || "Job Details"}
        isLoading={isDetailLoading}
      >
        {selectedJob && <ExperienceDetail job={selectedJob} />}
      </SlideOver>

      {/* Portfolio Detail Slide-Over */}
      <SlideOver
        isOpen={selectedProject !== null}
        onClose={handleCloseDetail}
        title={selectedProject?.name || "Project Details"}
        isLoading={isDetailLoading}
      >
        {selectedProject && <PortfolioDetail project={selectedProject} />}
      </SlideOver>

      {/* Blog Detail Slide-Over */}
      <SlideOver
        isOpen={selectedBlog !== null}
        onClose={handleCloseDetail}
        title={selectedBlog?.name || "Article Details"}
        isLoading={isDetailLoading}
      >
        {selectedBlog && <BlogDetail article={selectedBlog} />}
      </SlideOver>
    </div>
  )
}
