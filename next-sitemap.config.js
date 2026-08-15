const BLOG_API_URL = 'https://server.filipio.com/api/blogs/'

// next-sitemap only knows about static/dynamic file-based routes — it has
// no way to discover individual /blog/[slug] pages on its own. This fetches
// every published post at build time (runs as the `postbuild` npm script,
// so it has network access on the CI build machine) and adds one sitemap
// entry per post, which is what actually gets these pages crawled/indexed.
async function fetchAllBlogPaths(config) {
  const paths = []
  let url = BLOG_API_URL

  while (url) {
    let data
    try {
      const res = await fetch(url)
      if (!res.ok) break
      data = await res.json()
    } catch (err) {
      console.error('next-sitemap: failed to fetch blog posts for sitemap, skipping', err)
      break
    }

    for (const blog of data.results || []) {
      paths.push({
        loc: `/blog/${blog.slug}`,
        changefreq: config.changefreq,
        priority: config.priority,
        lastmod: blog.timestamp,
      })
    }

    url = data.next
  }

  return paths
}

module.exports = {
  siteUrl: 'https://filipio.com',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  additionalPaths: fetchAllBlogPaths,
}
