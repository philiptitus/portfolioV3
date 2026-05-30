import { Metadata } from 'next'
import { serverFetch } from '@/lib/server-fetch'
import BlogClient from './blog-client'

export const metadata: Metadata = {
  title: 'Blog – Philip Titus | Software & ML Engineer',
  description: 'Technical articles and insights by Philip Titus on software engineering, machine learning, cloud architecture and full-stack development.',
}

export default async function BlogPage() {
  const initialData = await serverFetch('/api/blogs/')
  return <BlogClient initialData={initialData} />
}
