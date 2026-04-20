"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { FeatureGrid } from "@/components/feature-grid"
import { AboutSection } from "@/components/about-section"
import { CertificatesSection } from "@/components/certificates-section"
import { PricingSection } from "@/components/pricing-section"
import { ExperienceSection } from "@/components/experience-section"
import { GlitchMarquee } from "@/components/glitch-marquee"
import { Footer } from "@/components/footer"
import { SlideOver } from "@/components/slide-over"
import { SkeletonCard } from "@/components/skeleton-loader"
import { ExperienceDetail } from "@/components/details/experience-detail"
import { PortfolioDetail } from "@/components/details/portfolio-detail"
import { BlogDetail } from "@/components/details/blog-detail"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { fetchDashboard } from "@/store/actions"
import { jobs, keySkills, blogs, portfolioProjects } from "@/data/mock-data"

export default function Page() {
  const dispatch = useAppDispatch()
  const { data: dashboardData, loading, error } = useAppSelector(state => state.dashboard)
  
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null)
  const [selectedProjectSlug, setSelectedProjectSlug] = useState<string | null>(null)
  const [selectedBlogSlug, setSelectedBlogSlug] = useState<string | null>(null)

  // Fetch dashboard data on component mount
  useEffect(() => {
    dispatch(fetchDashboard() as any)
  }, [dispatch])

  const handleOpenJobDetail = (job: typeof jobs[0]) => {
    setSelectedJobId(job.id)
  }

  const handleOpenProjectDetail = (project: typeof portfolioProjects[0]) => {
    setSelectedProjectSlug(project.slug)
  }

  const handleOpenBlogDetail = (blog: typeof blogs[0]) => {
    setSelectedBlogSlug(blog.slug)
  }

  const handleCloseDetail = () => {
    setSelectedJobId(null)
    setSelectedProjectSlug(null)
    setSelectedBlogSlug(null)
  }

  // Show loading skeleton if dashboard is loading
  if (loading) {
    return (
      <div className="min-h-screen dot-grid-bg">
        <Navbar />
        <main className="space-y-20 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </main>
      </div>
    )
  }

  // Show error message if there's an error
  if (error) {
    return (
      <div className="min-h-screen dot-grid-bg">
        <Navbar />
        <main className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Unable to Load Content</h2>
            <p className="text-muted-foreground mb-4">{error}</p>
            <button
              onClick={() => dispatch(fetchDashboard() as any)}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
            >
              Try Again
            </button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen dot-grid-bg">
      <Navbar />
      <main>
        <HeroSection />
        <FeatureGrid onPortfolioClick={handleOpenProjectDetail} />
        <CertificatesSection />
        <ExperienceSection jobs={jobs} onJobClick={handleOpenJobDetail} />
        <GlitchMarquee skills={keySkills} />
        <PricingSection blogs={blogs} onBlogClick={handleOpenBlogDetail} />
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
