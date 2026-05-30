import { Metadata } from 'next'
import { serverFetch } from '@/lib/server-fetch'
import CertificationsClient from './certifications-client'

export const metadata: Metadata = {
  title: 'Certifications – Philip Titus | Software & ML Engineer',
  description: 'Professional certifications and credentials earned by Philip Titus in software engineering, cloud platforms, machine learning and DevOps.',
}

export default async function CertificationsPage() {
  const initialData = await serverFetch('/api/certificates/')
  return <CertificationsClient initialData={initialData} />
}
