import { Metadata } from 'next'
import { serverFetch } from '@/lib/server-fetch'
import ExperienceClient from './experience-client'

export const metadata: Metadata = {
  title: 'Experience – Philip Titus | Software & ML Engineer',
  description: 'Professional experience of Philip Titus — software engineer based in Nairobi, Kenya with 5+ years across full-stack development, cloud architecture and machine learning.',
}

export default async function ExperiencePage() {
  const initialData = await serverFetch('/api/jobs/')
  return (
    <>
      <div className="sr-only">
        <h1>Philip Titus — Professional Experience</h1>
        <p>Professional work history of Philip Titus — software engineer based in Nairobi, Kenya with experience at Velvora, Youth Enterprise Development Fund, CheapTrip, Freshly Farms and as a freelance engineer on Upwork and Fiverr.</p>
      </div>
      <ExperienceClient initialData={initialData} />
    </>
  )
}
