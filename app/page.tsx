import { serverFetchDashboard } from '@/lib/server-fetch'
import HomeClient from './home-client'

export default async function HomePage() {
  const initialData = await serverFetchDashboard()
  return (
    <>
      <div className="sr-only">
        <h1>Philip Titus — Software Engineer & Machine Learning Specialist</h1>
        <p>Philip Titus is a software engineer and ML specialist based in Nairobi, Kenya. Specialising in backend development with Django and Python, cloud architecture on Google Cloud Platform, and machine learning integrations. Available for freelance projects and product collaborations.</p>
      </div>
      <HomeClient initialData={initialData} />
    </>
  )
}
