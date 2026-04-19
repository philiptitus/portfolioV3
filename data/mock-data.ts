// Types matching the API schema exactly
export interface Skill {
  id: number
  name: string
  score: number
  image: string | null
  is_key_skill: boolean
}

export interface Certificate {
  id: number
  date: string
  name: string
  title: string
  is_active: boolean
  is_ongoing: boolean
  image_url: string
  url: string | null
}

export interface Blog {
  id: number
  timestamp: string
  author: string
  name: string
  description: string
  png_url: string | null
  category: string
  slug: string
  image_url: string | null
  is_active: boolean
}

export interface Portfolio {
  id: number
  date: string
  name: string
  description: string
  image_url: string
  core_skill: string
  category: string
  tier: string
  slug: string
  star: boolean
  featured: boolean
  is_api: boolean
  is_live: boolean
  skill_count: number
}

export interface Award {
  id: number
  date: string
  issued_by: string
  title: string
  is_active: boolean
  image_url: string
}

export interface Job {
  id: number
  job_title: string
  company_name: string
  location: string
  start_date: string
  end_date: string | null
  is_current: boolean
  created_at: string
  updated_at: string
  url: string
}

// Key skills from the full skills list
export const keySkills: Skill[] = [
  { id: 1, name: "HTML AND CSS", score: 98, image: null, is_key_skill: true },
  { id: 2, name: "DJANGO", score: 89, image: null, is_key_skill: true },
  { id: 3, name: "JAVASCRIPT/REACT", score: 87, image: null, is_key_skill: true },
  { id: 5, name: "AWS", score: 80, image: null, is_key_skill: true },
  { id: 40, name: "TENSORFLOW", score: 80, image: null, is_key_skill: true },
  { id: 41, name: "PYTORCH", score: 80, image: null, is_key_skill: true },
  { id: 128, name: "NODE.JS", score: 80, image: null, is_key_skill: true },
  { id: 129, name: "POSTGRESQL", score: 80, image: null, is_key_skill: true },
]

// Certificates from API
export const certificates: Certificate[] = [
  {
    id: 12,
    date: "2026-01-09T10:39:35Z",
    name: "AI Agents Intensive Course with Google",
    title: "AI Agents Intensive Course with Google",
    is_active: true,
    is_ongoing: false,
    image_url: "https://izpkijnmscmbolveusoo.supabase.co/storage/v1/object/public/Galleria/Portfolio/5-Day%20AI%20Agents%20Intensive%20Course%20with%20Google(1).png",
    url: "https://www.kaggle.com/certification/badges/philiptitus/105",
  },
  {
    id: 11,
    date: "2025-11-04T20:39:05Z",
    name: "Getting Started with DevOps on AWS",
    title: "Getting Started with DevOps on AWS",
    is_active: true,
    is_ongoing: false,
    image_url: "https://izpkijnmscmbolveusoo.supabase.co/storage/v1/object/public/Galleria/Portfolio/devops.png",
    url: null,
  },
  {
    id: 10,
    date: "2025-11-04T20:37:00Z",
    name: "AWS Lambda Foundations",
    title: "AWS Lambda Foundations",
    is_active: true,
    is_ongoing: false,
    image_url: "https://izpkijnmscmbolveusoo.supabase.co/storage/v1/object/public/Galleria/Portfolio/lambda.png",
    url: null,
  },
  {
    id: 8,
    date: "2025-05-10T09:38:36Z",
    name: "LFS250: Kubernetes and Cloud Native Essentials",
    title: "LFS250: Kubernetes and Cloud Native Essentials",
    is_active: true,
    is_ongoing: false,
    image_url: "https://izpkijnmscmbolveusoo.supabase.co/storage/v1/object/public/Galleria/Portfolio/Screenshot%202025-06-12%20124000.png",
    url: "https://www.credly.com/badges/95e98980-c1f1-4c54-850c-9052b2018ed4/public_url",
  },
  {
    id: 6,
    date: "2025-05-10T09:33:53Z",
    name: "LFS 158: INTRODUCTION TO KUBERNETES",
    title: "LFS 158: INTRODUCTION TO KUBERNETES",
    is_active: true,
    is_ongoing: false,
    image_url: "https://izpkijnmscmbolveusoo.supabase.co/storage/v1/object/public/Galleria/Portfolio/Screenshot%202025-06-12%20123508.png",
    url: "https://www.credly.com/badges/4bb63ddf-2861-4fbf-86b3-b96a8a0d33f7/public_url",
  },
]

// Portfolio projects from API
export const portfolioProjects: Portfolio[] = [
  {
    id: 13,
    date: "2025-11-04T19:18:01Z",
    name: "TalkLink",
    description: "State of the art Interpretation Services",
    image_url: "https://izpkijnmscmbolveusoo.supabase.co/storage/v1/object/public/Galleria/Portfolio/talklink2%20(1).png",
    core_skill: "JAVASCRIPT",
    category: "WEB DEVELOPMENT",
    tier: "S",
    slug: "talklink",
    star: false,
    featured: false,
    is_api: false,
    is_live: true,
    skill_count: 10,
  },
  {
    id: 12,
    date: "2025-08-01T13:27:44Z",
    name: "Youth Fund Kenya Inventory System",
    description: "An Inventory System I recently built while working In Youth Fund",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYX-2s8xRlUvUApWiNgetnZrqEeCKHj_wf8g&s",
    core_skill: "JAVASCRIPT",
    category: "WEB DEVELOPMENT",
    tier: "A",
    slug: "youth-fund-kenya-inventory-system",
    star: false,
    featured: false,
    is_api: false,
    is_live: true,
    skill_count: 9,
  },
  {
    id: 11,
    date: "2025-07-21T07:25:09Z",
    name: "Fiona AI",
    description: "Automate Your Email Campaigns",
    image_url: "https://izpkijnmscmbolveusoo.supabase.co/storage/v1/object/public/Galleria/Portfolio/fiona%20(1).png",
    core_skill: "DJANGO + REACT",
    category: "WEB DEVELOPMENT",
    tier: "S",
    slug: "fiona-ai",
    star: false,
    featured: true,
    is_api: false,
    is_live: true,
    skill_count: 3,
  },
  {
    id: 7,
    date: "2024-08-07T08:21:14Z",
    name: "ReUp",
    description: "Mobile app to help in streamlined environmental conservation.",
    image_url: "https://izpkijnmscmbolveusoo.supabase.co/storage/v1/object/public/Galleria/Portfolio/logo12_2.png",
    core_skill: "DJANGO + REACT NATIVE",
    category: "MOBILE DEVELOPMENT",
    tier: "A",
    slug: "reup",
    star: false,
    featured: false,
    is_api: true,
    is_live: true,
    skill_count: 18,
  },
  {
    id: 5,
    date: "2024-07-19T17:01:24Z",
    name: "jennie",
    description: "Ace your interviews with real time AI mockups",
    image_url: "https://izpkijnmscmbolveusoo.supabase.co/storage/v1/object/public/Galleria/Portfolio/jennie_official.png",
    core_skill: "PYTHON",
    category: "WEB DEVELOPMENT",
    tier: "A",
    slug: "jennie",
    star: false,
    featured: true,
    is_api: true,
    is_live: true,
    skill_count: 19,
  },
]

// Awards from API
export const awards: Award[] = [
  {
    id: 4,
    date: "2025-06-16T10:03:56Z",
    issued_by: "Phoenix KE Analytics",
    title: "Phoenix Analytics MasterClass Session",
    is_active: true,
    image_url: "https://izpkijnmscmbolveusoo.supabase.co/storage/v1/object/public/Galleria/Portfolio/Building%20An%20AI-Powered%20Budget%20Management%20System%20(5)_page-0001.jpg",
  },
  {
    id: 3,
    date: "2025-02-06T10:13:29Z",
    issued_by: "Vambo AI and Futurize",
    title: "KIW Hackathon",
    is_active: true,
    image_url: "https://izpkijnmscmbolveusoo.supabase.co/storage/v1/object/public/Galleria/Portfolio/Vambo.png",
  },
  {
    id: 2,
    date: "2024-10-11T12:00:00Z",
    issued_by: "Power Learn Project Africa (PLP)",
    title: "PLP Social Justice Hackathon",
    is_active: true,
    image_url: "https://izpkijnmscmbolveusoo.supabase.co/storage/v1/object/public/Galleria/Portfolio/PLP_page-0001.jpg",
  },
  {
    id: 1,
    date: "2024-08-01T14:34:34Z",
    issued_by: "Kilimani Project Foundation & ALX",
    title: "Kilimani Prop Tech Hackathon",
    is_active: true,
    image_url: "https://izpkijnmscmbolveusoo.supabase.co/storage/v1/object/public/Galleria/Portfolio/Kilimani_page-0001.jpg",
  },
]

// Jobs from API
export const jobs: Job[] = [
  {
    id: 5,
    job_title: "Backend Software Engineer",
    company_name: "Velvora",
    location: "Dubai, UAE (Remote)",
    start_date: "2026-01-01",
    end_date: null,
    is_current: true,
    created_at: "2026-01-09T10:52:17.390775Z",
    updated_at: "2026-01-09T11:01:36.689172Z",
    url: "https://www.velvoragroup.com/",
  },
  {
    id: 4,
    job_title: "ICT– Infrastructure & Support",
    company_name: "Youth Enterprise Development Fund",
    location: "Nairobi, Kenya",
    start_date: "2025-06-03",
    end_date: null,
    is_current: false,
    created_at: "2025-06-12T09:52:00.909515Z",
    updated_at: "2026-01-09T11:01:39.836624Z",
    url: "http://www.youthfund.go.ke/",
  },
  {
    id: 3,
    job_title: "Python Developer",
    company_name: "CheapTrip",
    location: "Tel-Aviv Israel(Remote)",
    start_date: "2024-12-16",
    end_date: null,
    is_current: false,
    created_at: "2024-12-17T19:21:12.992845Z",
    updated_at: "2026-01-09T11:01:42.642785Z",
    url: "https://cheaptrip.guru",
  },
  {
    id: 1,
    job_title: "Backend Engineer",
    company_name: "Freshly Farms",
    location: "Nairobi, Kenya",
    start_date: "2024-08-26",
    end_date: "2024-12-17",
    is_current: false,
    created_at: "2024-11-29T14:50:43.896877Z",
    updated_at: "2026-01-09T11:01:45.549700Z",
    url: "https://freshlyfrontend.vercel.app/",
  },
]

// Blogs from API
export const blogs: Blog[] = [
  {
    id: 13,
    timestamp: "2026-01-24T17:21:07.318615Z",
    author: "Me",
    name: "Deploying Google ADK Agents",
    description: "How to deploy Google ADK Agents on Cloud Run as a Flask Microservice",
    png_url: "https://codelabs.developers.google.com/static/deploy-manage-observe-adk-cloud-run/img/20d503f01eaadfd.jpeg",
    category: "DATA SCIENCE.AI AND ML",
    slug: "deploying-google-adk-agents",
    image_url: "https://miro.medium.com/0*OgLv9sio_2gCNcjc",
    is_active: true,
  },
  {
    id: 12,
    timestamp: "2026-01-18T17:14:02.047298Z",
    author: "Me",
    name: "Build a serveless Backend",
    description: "Building A serveless Backend with AWS Aurora and Lambda",
    png_url: "https://thekevinwang.com/image/2022/03/16/lambda-aurora.png",
    category: "CLOUD COMPUTING",
    slug: "build-a-serveless-backend",
    image_url: "https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F4ae7t5ev5hzkfq2pfe8o.png",
    is_active: true,
  },
  {
    id: 10,
    timestamp: "2025-07-08T11:57:29.229814Z",
    author: "Codingforinnovations",
    name: "Deploying Django On Vercel",
    description: "In this Tutorial you will see how to deploy django on serveless on the vercel python runtime environment",
    png_url: null,
    category: "WEB DEVELOPMENT",
    slug: "deploying-django-on-vercel",
    image_url: null,
    is_active: true,
  },
  {
    id: 9,
    timestamp: "2025-06-13T09:55:23.917665Z",
    author: "Me",
    name: "Connecting NameCheap Domain To Vercel",
    description: "How I Bought a Domain on Namecheap and Hooked It Up to My Vercel Project",
    png_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIlEigaUjpwZ7UfTN74vQWBMX3qeNt9o0PcQ&s",
    category: "WEB DEVELOPMENT",
    slug: "connecting-namecheap-domain-to-vercel",
    image_url: "https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2023/08/how-to-choose-the-right-domain-name.png",
    is_active: true,
  },
]
