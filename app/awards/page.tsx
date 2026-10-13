import { Metadata } from 'next'
import AwardsClient from './awards-client'

export const metadata: Metadata = {
  title: 'Awards – Philip Titus | Software & ML Engineer',
  description: 'Awards and recognition received by Philip Titus for excellence in software engineering, machine learning and technology innovation.',
}

export default function AwardsPage() {
  return <AwardsClient />
}
