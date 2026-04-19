// Portfolio Types
export interface Skill {
  id: number;
  name: string;
  score: number;
  image: string | null;
  is_key_skill: boolean;
}

export interface Portfolio {
  id: number;
  date: string;
  name: string;
  description: string;
  image_url: string;
  core_skill: string;
  category: string;
  tier: string;
  slug: string;
  star: boolean;
  featured: boolean;
  is_api: boolean;
  is_live: boolean;
  skill_count: number;
}

export interface PortfolioDetail extends Portfolio {
  body: string;
  url: string;
  image2_url: string | null;
  image3_url: string | null;
  image4_url: string | null;
  image5_url: string | null;
  image6_url: string | null;
  image7_url: string | null;
  image8_url: string | null;
  image9_url: string | null;
  image10_url: string | null;
  url_2: string;
  url_3: string;
  amazon_url: string | null;
  video_url: string | null;
  is_api: boolean;
  is_live: boolean;
  app: string | null;
  is_active: boolean;
  skills: Skill[];
}

// Blog Types
export interface Blog {
  id: number;
  timestamp: string;
  author: string;
  name: string;
  description: string;
  png_url: string | null;
  category: string;
  slug: string;
  image_url: string | null;
  is_active: boolean;
}

export interface BlogDetail extends Blog {
  body: string;
}

// Certificate Types
export interface Certificate {
  id: number;
  date: string;
  name: string;
  title: string;
  is_active: boolean;
  is_ongoing: boolean;
  image_url: string;
  url: string | null;
}

export interface CertificateDetail extends Certificate {
  description: string;
}

// Award Types
export interface Award {
  id: number;
  date: string;
  issued_by: string;
  title: string;
  is_active: boolean;
  image_url: string;
}

export interface AwardDetail extends Award {
  description: string;
}

// Job Types
export interface Job {
  id: number;
  job_title: string;
  company_name: string;
  location: string;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  created_at: string;
  updated_at: string;
  url: string;
}

export interface JobDetail extends Job {
  description: string;
}

// Dashboard Types
export interface DashboardData {
  count: number;
  next: string | null;
  previous: string | null;
  results: any[];
}

// API Response Types
export interface ApiResponse<T> {
  count?: number;
  next?: string | null;
  previous?: string | null;
  results?: T[];
}

// Redux State Types
export interface PortfolioState {
  portfolios: Portfolio[];
  portfolioDetail: PortfolioDetail | null;
  loading: boolean;
  listLoading: boolean;
  detailLoading: boolean;
  error: string | null;
  pagination: {
    count: number;
    next: string | null;
    previous: string | null;
  };
}

export interface BlogState {
  blogs: Blog[];
  blogDetail: BlogDetail | null;
  loading: boolean;
  listLoading: boolean;
  detailLoading: boolean;
  error: string | null;
  pagination: {
    count: number;
    next: string | null;
    previous: string | null;
  };
}

export interface CertificateState {
  certificates: Certificate[];
  certificateDetail: CertificateDetail | null;
  loading: boolean;
  listLoading: boolean;
  detailLoading: boolean;
  error: string | null;
  pagination: {
    count: number;
    next: string | null;
    previous: string | null;
  };
}

export interface AwardState {
  awards: Award[];
  awardDetail: AwardDetail | null;
  loading: boolean;
  listLoading: boolean;
  detailLoading: boolean;
  error: string | null;
  pagination: {
    count: number;
    next: string | null;
    previous: string | null;
  };
}

export interface JobState {
  jobs: Job[];
  jobDetail: JobDetail | null;
  loading: boolean;
  listLoading: boolean;
  detailLoading: boolean;
  error: string | null;
  pagination: {
    count: number;
    next: string | null;
    previous: string | null;
  };
}

export interface DashboardState {
  data: DashboardData | null;
  loading: boolean;
  error: string | null;
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
}

export interface ChatbotState {
  messages: ChatMessage[];
  loading: boolean;
  error: string | null;
  sessionId: string | null;
  sessionExpiry: string | null;
  cacheStatus: 'hit' | 'miss' | 'refreshed' | null;
}

export interface ContactState {
  submitted: boolean;
  loading: boolean;
  error: string | null;
}

export interface RootState {
  portfolio: PortfolioState;
  blog: BlogState;
  certificate: CertificateState;
  award: AwardState;
  job: JobState;
  dashboard: DashboardState;
  chatbot: ChatbotState;
  contact: ContactState;
}
