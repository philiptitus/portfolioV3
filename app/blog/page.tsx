import { Metadata } from 'next'
import BlogClient from './blog-client'

export const metadata: Metadata = {
  title: 'Blog – Philip Titus | Software & ML Engineer',
  description: 'Technical articles and insights by Philip Titus on software engineering, machine learning, cloud architecture and full-stack development.',
}

export default function BlogPage() {
  return <BlogClient />
}
