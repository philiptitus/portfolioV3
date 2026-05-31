import { Metadata } from 'next'
import { serverFetch } from '@/lib/server-fetch'
import PortfolioClient from './portfolio-client'

export const metadata: Metadata = {
  title: 'Portfolio – Philip Titus | Software & ML Engineer',
  description: 'Projects and work by Philip Titus — full-stack web apps, mobile applications, AI integrations and cloud-based systems built with Django, React and Next.js.',
}

export default async function PortfolioPage() {
  const initialData = await serverFetch('/api/portfolios/')
  return (
    <>
      <div className="sr-only">
        <h1>Philip Titus — Software Engineering Portfolio</h1>
        <p>A collection of software projects by Philip Titus including full-stack web applications, mobile apps, AI integrations and cloud-based systems built with Django, Next.js and Google Cloud Platform.</p>
      </div>
      <PortfolioClient initialData={initialData} />
    </>
  )
}
