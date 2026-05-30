import { serverFetchDashboard } from '@/lib/server-fetch'
import HomeClient from './home-client'

export default async function HomePage() {
  const initialData = await serverFetchDashboard()
  return <HomeClient initialData={initialData} />
}
