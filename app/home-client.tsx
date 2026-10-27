"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { FeatureGrid } from "@/components/feature-grid"
import { CertificatesSection } from "@/components/certificates-section"
import { BlogsSection } from "@/components/blogs-section"
import { ExperienceSection } from "@/components/experience-section"
import { GlitchMarquee } from "@/components/glitch-marquee"
import { Footer } from "@/components/footer"
import { SlideOver } from "@/components/slide-over"
import { ExperienceDetail } from "@/components/details/experience-detail"
import { PortfolioDetail } from "@/components/details/portfolio-detail"
import { BlogDetail } from "@/components/details/blog-detail"
import { Blog, DashboardData, Job, Portfolio } from "@/store/types"

export default function HomeClient({ initialData }: { initialData: DashboardData }) {
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null)
  const [selectedProjectSlug, setSelectedProjectSlug] = useState<string | null>(null)
  const [selectedBlogSlug, setSelectedBlogSlug] = useState<string | null>(null)

  const handleOpenJobDetail = (job: Job) => {
    setSelectedJobId(job.id)
  }

  const handleOpenProjectDetail = (project: Portfolio) => {
    setSelectedProjectSlug(project.slug)
  }

  const handleOpenBlogDetail = (blog: Blog) => {
    setSelectedBlogSlug(blog.slug)
  }

  const handleCloseDetail = () => {
    setSelectedJobId(null)
    setSelectedProjectSlug(null)
    setSelectedBlogSlug(null)
  }

  return (
    <div className="min-h-screen dot-grid-bg">
      <Navbar />
      <main>
        <HeroSection />
        <FeatureGrid
          projects={initialData.portfolio}
          onPortfolioClick={handleOpenProjectDetail}
        />
        <CertificatesSection
          certificates={initialData.certificates}
          projectCount={initialData.portfolio.length}
        />
        <ExperienceSection jobs={initialData.jobs} onJobClick={handleOpenJobDetail} />
        <GlitchMarquee skills={initialData.skills.filter(skill => skill.is_key_skill)} />
        <BlogsSection blogs={initialData.blogs} onBlogClick={handleOpenBlogDetail} />
      </main>
      <Footer />

      {/* Job Detail Slide-Over */}
      <SlideOver
        isOpen={selectedJobId !== null}
        onClose={handleCloseDetail}
        title="Job Details"
      >
        {selectedJobId && <ExperienceDetail id={selectedJobId} />}
      </SlideOver>

      {/* Portfolio Detail Slide-Over */}
      <SlideOver
        isOpen={selectedProjectSlug !== null}
        onClose={handleCloseDetail}
        title="Project Details"
      >
        {selectedProjectSlug && <PortfolioDetail slug={selectedProjectSlug} />}
      </SlideOver>

      {/* Blog Detail Slide-Over */}
      <SlideOver
        isOpen={selectedBlogSlug !== null}
        onClose={handleCloseDetail}
        title="Article Details"
      >
        {selectedBlogSlug && <BlogDetail slug={selectedBlogSlug} />}
      </SlideOver>
    </div>
  )
}
