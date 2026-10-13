import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { serverFetch } from '@/lib/server-fetch'
import type { BlogDetail as BlogDetailType } from '@/store/types'
import BlogDetailPageClient from './blog-detail-page-client'

interface PageProps {
  params: Promise<{ slug: string }>
}

const SITE_URL = 'https://filipio.com'

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const article: BlogDetailType | null = await serverFetch(`/api/blogs/${slug}/`)

  if (!article) {
    return { title: 'Blog Post Not Found | Philip Titus' }
  }

  const url = `${SITE_URL}/blog/${slug}`
  const images = article.image_url ? [{ url: article.image_url }] : undefined

  return {
    title: `${article.name} | Philip Titus`,
    description: article.description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title: article.name,
      description: article.description,
      url,
      images,
      publishedTime: article.timestamp,
      authors: article.author ? [article.author] : undefined,
      tags: article.category ? [article.category] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.name,
      description: article.description,
      images: article.image_url ? [article.image_url] : undefined,
    },
  }
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params
  const article: BlogDetailType | null = await serverFetch(`/api/blogs/${slug}/`)

  if (!article) {
    notFound()
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.name,
    description: article.description,
    image: article.image_url || undefined,
    datePublished: article.timestamp,
    author: {
      '@type': 'Person',
      name: article.author || 'Philip Titus',
    },
    publisher: {
      '@type': 'Person',
      name: 'Philip Titus',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${slug}`,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogDetailPageClient article={article} />
    </>
  )
}
