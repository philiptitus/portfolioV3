import { PORTFOLIO_ACTIONS, BLOG_ACTIONS, CERTIFICATE_ACTIONS, AWARD_ACTIONS, JOB_ACTIONS, DASHBOARD_ACTIONS, CHATBOT_ACTIONS, CONTACT_ACTIONS } from './constants';
import { PortfolioState, BlogState, CertificateState, AwardState, JobState, DashboardState, ChatbotState, ContactState } from './types';

// ============= PORTFOLIO REDUCER =============

const initialPortfolioState: PortfolioState = {
  portfolios: [],
  portfolioDetail: null,
  loading: false,
  listLoading: false,
  detailLoading: false,
  error: null,
  pagination: {
    count: 0,
    next: null,
    previous: null,
  },
};

export const portfolioReducer = (
  state = initialPortfolioState,
  action: any
): PortfolioState => {
  switch (action.type) {
    case PORTFOLIO_ACTIONS.FETCH_PORTFOLIOS_REQUEST:
      return { ...state, listLoading: true, error: null };
    case PORTFOLIO_ACTIONS.FETCH_PORTFOLIO_DETAIL_REQUEST:
      return { ...state, detailLoading: true, error: null };
    case PORTFOLIO_ACTIONS.FETCH_PORTFOLIOS_SUCCESS:
      return {
        ...state,
        portfolios: action.payload.items,
        pagination: action.payload.pagination,
        listLoading: false,
      };
    case PORTFOLIO_ACTIONS.FETCH_PORTFOLIO_DETAIL_SUCCESS:
      return { ...state, portfolioDetail: action.payload, detailLoading: false };
    case PORTFOLIO_ACTIONS.FETCH_PORTFOLIOS_ERROR:
      return { ...state, listLoading: false, error: action.payload };
    case PORTFOLIO_ACTIONS.FETCH_PORTFOLIO_DETAIL_ERROR:
      return { ...state, detailLoading: false, error: action.payload };
    default:
      return state;
  }
};

// ============= BLOG REDUCER =============

const initialBlogState: BlogState = {
  blogs: [],
  blogDetail: null,
  loading: false,
  listLoading: false,
  detailLoading: false,
  error: null,
  pagination: {
    count: 0,
    next: null,
    previous: null,
  },
};

export const blogReducer = (
  state = initialBlogState,
  action: any
): BlogState => {
  switch (action.type) {
    case BLOG_ACTIONS.FETCH_BLOGS_REQUEST:
      return { ...state, listLoading: true, error: null };
    case BLOG_ACTIONS.FETCH_BLOG_DETAIL_REQUEST:
      return { ...state, detailLoading: true, error: null };
    case BLOG_ACTIONS.FETCH_BLOGS_SUCCESS:
      return {
        ...state,
        blogs: action.payload.items,
        pagination: action.payload.pagination,
        listLoading: false,
      };
    case BLOG_ACTIONS.FETCH_BLOG_DETAIL_SUCCESS:
      return { ...state, blogDetail: action.payload, detailLoading: false };
    case BLOG_ACTIONS.FETCH_BLOGS_ERROR:
      return { ...state, listLoading: false, error: action.payload };
    case BLOG_ACTIONS.FETCH_BLOG_DETAIL_ERROR:
      return { ...state, detailLoading: false, error: action.payload };
    default:
      return state;
  }
};

// ============= CERTIFICATE REDUCER =============

const initialCertificateState: CertificateState = {
  certificates: [],
  certificateDetail: null,
  loading: false,
  listLoading: false,
  detailLoading: false,
  error: null,
  pagination: {
    count: 0,
    next: null,
    previous: null,
  },
};

export const certificateReducer = (
  state = initialCertificateState,
  action: any
): CertificateState => {
  switch (action.type) {
    case CERTIFICATE_ACTIONS.FETCH_CERTIFICATES_REQUEST:
      return { ...state, listLoading: true, error: null };
    case CERTIFICATE_ACTIONS.FETCH_CERTIFICATE_DETAIL_REQUEST:
      return { ...state, detailLoading: true, error: null };
    case CERTIFICATE_ACTIONS.FETCH_CERTIFICATES_SUCCESS:
      return {
        ...state,
        certificates: action.payload.items,
        pagination: action.payload.pagination,
        listLoading: false,
      };
    case CERTIFICATE_ACTIONS.FETCH_CERTIFICATE_DETAIL_SUCCESS:
      return { ...state, certificateDetail: action.payload, detailLoading: false };
    case CERTIFICATE_ACTIONS.FETCH_CERTIFICATES_ERROR:
      return { ...state, listLoading: false, error: action.payload };
    case CERTIFICATE_ACTIONS.FETCH_CERTIFICATE_DETAIL_ERROR:
      return { ...state, detailLoading: false, error: action.payload };
    default:
      return state;
  }
};

// ============= AWARD REDUCER =============

const initialAwardState: AwardState = {
  awards: [],
  awardDetail: null,
  loading: false,
  listLoading: false,
  detailLoading: false,
  error: null,
  pagination: {
    count: 0,
    next: null,
    previous: null,
  },
};

export const awardReducer = (
  state = initialAwardState,
  action: any
): AwardState => {
  switch (action.type) {
    case AWARD_ACTIONS.FETCH_AWARDS_REQUEST:
      return { ...state, listLoading: true, error: null };
    case AWARD_ACTIONS.FETCH_AWARD_DETAIL_REQUEST:
      return { ...state, detailLoading: true, error: null };
    case AWARD_ACTIONS.FETCH_AWARDS_SUCCESS:
      return {
        ...state,
        awards: action.payload.items,
        pagination: action.payload.pagination,
        listLoading: false,
      };
    case AWARD_ACTIONS.FETCH_AWARD_DETAIL_SUCCESS:
      return { ...state, awardDetail: action.payload, detailLoading: false };
    case AWARD_ACTIONS.FETCH_AWARDS_ERROR:
      return { ...state, listLoading: false, error: action.payload };
    case AWARD_ACTIONS.FETCH_AWARD_DETAIL_ERROR:
      return { ...state, detailLoading: false, error: action.payload };
    default:
      return state;
  }
};

// ============= JOB REDUCER =============

const initialJobState: JobState = {
  jobs: [],
  jobDetail: null,
  loading: false,
  listLoading: false,
  detailLoading: false,
  error: null,
  pagination: {
    count: 0,
    next: null,
    previous: null,
  },
};

export const jobReducer = (
  state = initialJobState,
  action: any
): JobState => {
  switch (action.type) {
    case JOB_ACTIONS.FETCH_JOBS_REQUEST:
      return { ...state, listLoading: true, error: null };
    case JOB_ACTIONS.FETCH_JOB_DETAIL_REQUEST:
      return { ...state, detailLoading: true, error: null };
    case JOB_ACTIONS.FETCH_JOBS_SUCCESS:
      return {
        ...state,
        jobs: action.payload.items,
        pagination: action.payload.pagination,
        listLoading: false,
      };
    case JOB_ACTIONS.FETCH_JOB_DETAIL_SUCCESS:
      return { ...state, jobDetail: action.payload, detailLoading: false };
    case JOB_ACTIONS.FETCH_JOBS_ERROR:
      return { ...state, listLoading: false, error: action.payload };
    case JOB_ACTIONS.FETCH_JOB_DETAIL_ERROR:
      return { ...state, detailLoading: false, error: action.payload };
    default:
      return state;
  }
};

// ============= DASHBOARD REDUCER =============

const initialDashboardState: DashboardState = {
  data: null,
  loading: false,
  error: null,
};

export const dashboardReducer = (
  state = initialDashboardState,
  action: any
): DashboardState => {
  switch (action.type) {
    case DASHBOARD_ACTIONS.FETCH_DASHBOARD_REQUEST:
      return { ...state, loading: true, error: null };
    case DASHBOARD_ACTIONS.FETCH_DASHBOARD_SUCCESS:
      return { ...state, data: action.payload, loading: false };
    case DASHBOARD_ACTIONS.FETCH_DASHBOARD_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

// ============= CHATBOT REDUCER =============

const initialChatbotState: ChatbotState = {
  messages: [],
  loading: false,
  error: null,
  sessionId: null,
  sessionExpiry: null,
  cacheStatus: null,
};

export const chatbotReducer = (
  state = initialChatbotState,
  action: any
): ChatbotState => {
  switch (action.type) {
    case CHATBOT_ACTIONS.SEND_MESSAGE_REQUEST:
      return { ...state, loading: true, error: null };
    
    case CHATBOT_ACTIONS.ADD_USER_MESSAGE:
      return { ...state, messages: [...state.messages, action.payload] };
    
    case CHATBOT_ACTIONS.ADD_ASSISTANT_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload],
        loading: false,
        cacheStatus: action.payload.cacheStatus || null,
      };
    
    case CHATBOT_ACTIONS.SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        sessionId: action.payload.sessionId || state.sessionId,
        sessionExpiry: action.payload.sessionExpiry || state.sessionExpiry,
        cacheStatus: action.payload.cacheStatus,
      };
    
    case CHATBOT_ACTIONS.SEND_MESSAGE_ERROR:
      return { ...state, loading: false, error: action.payload };
    
    case CHATBOT_ACTIONS.SET_SESSION:
      return {
        ...state,
        sessionId: action.payload.sessionId,
        sessionExpiry: action.payload.sessionExpiry,
      };
    
    case CHATBOT_ACTIONS.LOAD_SESSION:
      return {
        ...state,
        messages: action.payload.messages || [],
        sessionId: action.payload.sessionId,
        sessionExpiry: action.payload.sessionExpiry,
      };
    
    case CHATBOT_ACTIONS.CLEAR_MESSAGES:
      return {
        ...state,
        messages: [],
        sessionId: null,
        sessionExpiry: null,
        error: null,
      };
    
    default:
      return state;
  }
};

// ============= CONTACT REDUCER =============

const initialContactState: ContactState = {
  submitted: false,
  loading: false,
  error: null,
};

export const contactReducer = (
  state = initialContactState,
  action: any
): ContactState => {
  switch (action.type) {
    case CONTACT_ACTIONS.SUBMIT_CONTACT_REQUEST:
      return { ...state, loading: true, error: null, submitted: false };
    case CONTACT_ACTIONS.SUBMIT_CONTACT_SUCCESS:
      return { ...state, loading: false, submitted: true, error: null };
    case CONTACT_ACTIONS.SUBMIT_CONTACT_ERROR:
      return { ...state, loading: false, error: action.payload, submitted: false };
    case CONTACT_ACTIONS.RESET_CONTACT_STATE:
      return initialContactState;
    default:
      return state;
  }
};
