import { Metadata } from 'next'
import { serverFetch } from '@/lib/server-fetch'
import AwardsClient from './awards-client'

export const metadata: Metadata = {
  title: 'Awards – Philip Titus | Software & ML Engineer',
  description: 'Awards and recognition received by Philip Titus for excellence in software engineering, machine learning and technology innovation.',
}

export default async function AwardsPage() {
  const initialData = await serverFetch('/api/awards/')
  return <AwardsClient initialData={initialData} />
}
