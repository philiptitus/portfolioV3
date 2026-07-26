import { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: 'About – Philip Titus | Software & ML Engineer',
  description: 'Philip Titus is a software engineer based in Nairobi, Kenya specialising in backend development, machine learning and cloud architecture. Available for freelance projects and product collaborations.',
}


export default function AboutPage() {
  return (
    <div className="min-h-screen dot-grid-bg">
      <Navbar />
      <main className="w-full px-6 py-20 lg:px-12">
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <div className="mb-16">
            <h1 className="text-4xl lg:text-5xl font-mono font-bold tracking-tight uppercase mb-4">
              Philip Titus
            </h1>
            <p className="text-sm lg:text-base font-mono text-muted-foreground">
              Software Engineer · Machine Learning · Cloud Architecture
            </p>
          </div>

          {/* Bio */}
          <div className="mb-16 space-y-6">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
                // BIO
              </span>
              <div className="flex-1 border-t border-border" />
            </div>

            <p className="text-sm lg:text-base font-mono leading-relaxed">
              Philip Titus is a software engineer based in Nairobi, Kenya with over 5 years of experience building scalable backend systems, intelligent machine learning pipelines, and cloud-native infrastructure. His core expertise spans Django, Python, Next.js, AWS, and Google Cloud Platform — the full stack from database to deployment.
            </p>

            <p className="text-sm lg:text-base font-mono leading-relaxed">
              Philip works at the intersection of backend engineering and artificial intelligence — designing APIs, deploying ML models, and architecting cloud systems that are built to scale. He has delivered projects across web development, mobile applications, and AI integrations for clients across Kenya, the UAE, Israel, and beyond.
            </p>

            <p className="text-sm lg:text-base font-mono leading-relaxed">
              He collaborates with businesses and individuals on freelance projects and product builds — particularly in areas where backend reliability, cloud efficiency, and AI capability create real competitive advantage. If you are looking for a technical partner to build or scale a product, Philip is available for engagements.
            </p>
          </div>

          {/* Skills */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
                // CORE_SKILLS
              </span>
              <div className="flex-1 border-t border-border" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                'Django & Python',
                'Next.js & React',
                'Google Cloud Platform',
                'Machine Learning',
                'PostgreSQL',
                'Docker & Cloud Run',
                'REST APIs',
                'AWS',
                'DevOps & CI/CD',
              ].map((skill) => (
                <div key={skill} className="border-2 border-foreground px-4 py-3 text-xs font-mono font-bold uppercase text-center hover:bg-foreground/10 transition-colors">
                  {skill}
                </div>
              ))}
            </div>
          </div>

          {/* Currently */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
                // CURRENTLY
              </span>
              <div className="flex-1 border-t border-border" />
            </div>

            <div className="space-y-4 border-l-2 border-foreground pl-6">
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono mb-1">Role</p>
                <p className="text-sm font-mono">Backend Software Engineer at Velvora — Dubai, UAE (Remote)</p>
              </div>

              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono mb-1">Location</p>
                <p className="text-sm font-mono">Nairobi, Kenya</p>
              </div>

              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono mb-1">Available</p>
                <p className="text-sm font-mono">Freelance projects and product collaborations</p>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
                // LINKS
              </span>
              <div className="flex-1 border-t border-border" />
            </div>

            <div className="flex flex-wrap gap-4 text-sm font-mono">
              <a href="https://linkedin.com/in/philiptitus" target="_blank" rel="noopener noreferrer" className="underline hover:text-muted-foreground transition-colors">
                [LinkedIn]
              </a>
              <a href="https://github.com/philiptitus" target="_blank" rel="noopener noreferrer" className="underline hover:text-muted-foreground transition-colors">
                [GitHub]
              </a>
              <a href="mailto:hi@filipio.com" className="underline hover:text-muted-foreground transition-colors">
                [hi@filipio.com]
              </a>
            </div>
          </div>

          {/* Internal links */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
                // EXPLORE
              </span>
              <div className="flex-1 border-t border-border" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Link href="/portfolio" className="border-2 border-foreground px-4 py-3 text-xs font-mono font-bold uppercase text-center hover:bg-foreground hover:text-background transition-colors">
                Portfolio →
              </Link>
              <Link href="/experience" className="border-2 border-foreground px-4 py-3 text-xs font-mono font-bold uppercase text-center hover:bg-foreground hover:text-background transition-colors">
                Experience →
              </Link>
              <Link href="/blog" className="border-2 border-foreground px-4 py-3 text-xs font-mono font-bold uppercase text-center hover:bg-foreground hover:text-background transition-colors">
                Blog →
              </Link>
              <Link href="/contact" className="border-2 border-foreground px-4 py-3 text-xs font-mono font-bold uppercase text-center hover:bg-foreground hover:text-background transition-colors">
                Contact →
              </Link>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  )
}
