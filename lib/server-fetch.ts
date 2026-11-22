import type { DashboardData } from '@/store/types'

const BACKEND_URL = process.env.BACKEND_URL!;
const DASHBOARD_CACHE_SECONDS = Number(process.env.DASHBOARD_CACHE_SECONDS ?? '300')

const EMPTY_DASHBOARD: DashboardData = {
  skills: [],
  certificates: [],
  blogs: [],
  portfolio: [],
  awards: [],
  jobs: [],
}

export async function serverFetchDashboard(): Promise<DashboardData> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 8000)

  try {
    const res = await fetch(`${BACKEND_URL}/api/dashboard/`, {
      signal: controller.signal,
      next: { revalidate: DASHBOARD_CACHE_SECONDS },
    })
    if (!res.ok) {
      throw new Error(`Dashboard request failed with status ${res.status}`)
    }

    return await res.json() as DashboardData
  } catch (error) {
    console.error('Dashboard request failed; serving an empty dashboard response.', error)
    return EMPTY_DASHBOARD
  } finally {
    clearTimeout(timeout)
  }
}

export async function serverFetch(endpoint: string) {
  try {
    const res = await fetch(`${BACKEND_URL}${endpoint}`, {
      cache: 'no-store'
    })
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}
