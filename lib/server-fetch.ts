const BACKEND_URL = process.env.BACKEND_URL || 'https://portfolio-136431337991.europe-west1.run.app';


export async function serverFetchDashboard() {
  try {
    const res = await fetch(`${BACKEND_URL}/api/dashboard/`, {
      next: { revalidate: 3600 }
    })
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
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
