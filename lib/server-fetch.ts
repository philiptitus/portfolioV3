import { awards, blogs, certificates, jobs, keySkills, portfolioProjects } from '@/data/mock-data'
import type { DashboardData } from '@/store/types'

const BACKEND_URL = process.env.BACKEND_URL!;

const STATIC_DASHBOARD_FALLBACK: DashboardData = {
  skills: keySkills,
  certificates,
  blogs,
  portfolio: portfolioProjects,
  awards,
  jobs,
}

let lastSuccessfulDashboardData = STATIC_DASHBOARD_FALLBACK

export async function serverFetchDashboard(): Promise<DashboardData> {
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return STATIC_DASHBOARD_FALLBACK
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 8000)

  try {
    const res = await fetch(`${BACKEND_URL}/api/dashboard/`, {
      signal: controller.signal,
      next: { revalidate: 3600 },
    })
    if (!res.ok) {
      throw new Error(`Dashboard request failed with status ${res.status}`)
    }

    lastSuccessfulDashboardData = await res.json() as DashboardData
    return lastSuccessfulDashboardData
  } catch (error) {
    console.error('Dashboard request failed; serving the last available dashboard data.', error)
    return lastSuccessfulDashboardData
  } finally {
    clearTimeout(timeout)
  }
}

export async function serverFetch(endpoint: string) {
  try {
    const res = await fetch(`${BACKEND_URL}${endpoint}`, {
      next: { revalidate: 3600 }
    })
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}
