import { Metadata } from 'next'
import { serverFetch } from '@/lib/server-fetch'
import PortfolioClient from './portfolio-client'

export const metadata: Metadata = {
  title: 'Portfolio – Philip Titus | Software & ML Engineer',
  description: 'Projects and work by Philip Titus — full-stack web apps, mobile applications, AI integrations and cloud-based systems built with Django, React and Next.js.',
}

export default async function PortfolioPage() {
  const initialData = await serverFetch('/api/portfolios/')
  return <PortfolioClient initialData={initialData} />
}
