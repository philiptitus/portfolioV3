import { Dispatch } from 'redux';
import api from '@/lib/api';
import { API_ENDPOINTS, PORTFOLIO_ACTIONS, BLOG_ACTIONS, CERTIFICATE_ACTIONS, AWARD_ACTIONS, JOB_ACTIONS, DASHBOARD_ACTIONS, CHATBOT_ACTIONS, CONTACT_ACTIONS } from './constants';
import { Portfolio, PortfolioDetail, Blog, BlogDetail, Certificate, CertificateDetail, Award, AwardDetail, Job, JobDetail, DashboardData, ChatMessage, ApiResponse } from './types';

// ============= PORTFOLIO ACTIONS =============

export const fetchPortfolios = (url?: string) => async (dispatch: Dispatch) => {
  dispatch({ type: PORTFOLIO_ACTIONS.FETCH_PORTFOLIOS_REQUEST });
  try {
    const endpoint = url || API_ENDPOINTS.PORTFOLIOS;
    const response = await api.get<ApiResponse<Portfolio>>(endpoint);
    dispatch({
      type: PORTFOLIO_ACTIONS.FETCH_PORTFOLIOS_SUCCESS,
      payload: {
        items: response.data.results || [],
        pagination: {
          count: response.data.count || 0,
          next: response.data.next || null,
          previous: response.data.previous || null,
        },
      },
    });
  } catch (error: any) {
    dispatch({
      type: PORTFOLIO_ACTIONS.FETCH_PORTFOLIOS_ERROR,
      payload: error.message || 'Failed to fetch portfolios',
    });
  }
};

export const fetchPortfolioDetail = (slug: string) => async (dispatch: Dispatch) => {
  dispatch({ type: PORTFOLIO_ACTIONS.FETCH_PORTFOLIO_DETAIL_REQUEST });
  try {
    const response = await api.get<PortfolioDetail>(API_ENDPOINTS.PORTFOLIO_DETAIL(slug));
    dispatch({
      type: PORTFOLIO_ACTIONS.FETCH_PORTFOLIO_DETAIL_SUCCESS,
      payload: response.data,
    });
  } catch (error: any) {
    dispatch({
      type: PORTFOLIO_ACTIONS.FETCH_PORTFOLIO_DETAIL_ERROR,
      payload: error.message || 'Failed to fetch portfolio detail',
    });
  }
};

// ============= BLOG ACTIONS =============

export const fetchBlogs = (url?: string) => async (dispatch: Dispatch) => {
  dispatch({ type: BLOG_ACTIONS.FETCH_BLOGS_REQUEST });
  try {
    const endpoint = url || API_ENDPOINTS.BLOGS;
    const response = await api.get<ApiResponse<Blog>>(endpoint);
    dispatch({
      type: BLOG_ACTIONS.FETCH_BLOGS_SUCCESS,
      payload: {
        items: response.data.results || [],
        pagination: {
          count: response.data.count || 0,
          next: response.data.next || null,
          previous: response.data.previous || null,
        },
      },
    });
  } catch (error: any) {
    dispatch({
      type: BLOG_ACTIONS.FETCH_BLOGS_ERROR,
      payload: error.message || 'Failed to fetch blogs',
    });
  }
};

export const fetchBlogDetail = (slug: string) => async (dispatch: Dispatch) => {
  dispatch({ type: BLOG_ACTIONS.FETCH_BLOG_DETAIL_REQUEST });
  try {
    const response = await api.get<BlogDetail>(API_ENDPOINTS.BLOG_DETAIL(slug));
    dispatch({
      type: BLOG_ACTIONS.FETCH_BLOG_DETAIL_SUCCESS,
      payload: response.data,
    });
  } catch (error: any) {
    dispatch({
      type: BLOG_ACTIONS.FETCH_BLOG_DETAIL_ERROR,
      payload: error.message || 'Failed to fetch blog detail',
    });
  }
};

// ============= CERTIFICATE ACTIONS =============

export const fetchCertificates = (url?: string) => async (dispatch: Dispatch) => {
  dispatch({ type: CERTIFICATE_ACTIONS.FETCH_CERTIFICATES_REQUEST });
  try {
    const endpoint = url || API_ENDPOINTS.CERTIFICATES;
    const response = await api.get<ApiResponse<Certificate>>(endpoint);
    dispatch({
      type: CERTIFICATE_ACTIONS.FETCH_CERTIFICATES_SUCCESS,
      payload: {
        items: response.data.results || [],
        pagination: {
          count: response.data.count || 0,
          next: response.data.next || null,
          previous: response.data.previous || null,
        },
      },
    });
  } catch (error: any) {
    dispatch({
      type: CERTIFICATE_ACTIONS.FETCH_CERTIFICATES_ERROR,
      payload: error.message || 'Failed to fetch certificates',
    });
  }
};

export const fetchCertificateDetail = (id: number) => async (dispatch: Dispatch) => {
  dispatch({ type: CERTIFICATE_ACTIONS.FETCH_CERTIFICATE_DETAIL_REQUEST });
  try {
    const response = await api.get<CertificateDetail>(API_ENDPOINTS.CERTIFICATE_DETAIL(id));
    dispatch({
      type: CERTIFICATE_ACTIONS.FETCH_CERTIFICATE_DETAIL_SUCCESS,
      payload: response.data,
    });
  } catch (error: any) {
    dispatch({
      type: CERTIFICATE_ACTIONS.FETCH_CERTIFICATE_DETAIL_ERROR,
      payload: error.message || 'Failed to fetch certificate detail',
    });
  }
};

// ============= AWARD ACTIONS =============

export const fetchAwards = (url?: string) => async (dispatch: Dispatch) => {
  dispatch({ type: AWARD_ACTIONS.FETCH_AWARDS_REQUEST });
  try {
    const endpoint = url || API_ENDPOINTS.AWARDS;
    const response = await api.get<ApiResponse<Award>>(endpoint);
    dispatch({
      type: AWARD_ACTIONS.FETCH_AWARDS_SUCCESS,
      payload: {
        items: response.data.results || [],
        pagination: {
          count: response.data.count || 0,
          next: response.data.next || null,
          previous: response.data.previous || null,
        },
      },
    });
  } catch (error: any) {
    dispatch({
      type: AWARD_ACTIONS.FETCH_AWARDS_ERROR,
      payload: error.message || 'Failed to fetch awards',
    });
  }
};

export const fetchAwardDetail = (id: number) => async (dispatch: Dispatch) => {
  dispatch({ type: AWARD_ACTIONS.FETCH_AWARD_DETAIL_REQUEST });
  try {
    const response = await api.get<AwardDetail>(API_ENDPOINTS.AWARD_DETAIL(id));
    dispatch({
      type: AWARD_ACTIONS.FETCH_AWARD_DETAIL_SUCCESS,
      payload: response.data,
    });
  } catch (error: any) {
    dispatch({
      type: AWARD_ACTIONS.FETCH_AWARD_DETAIL_ERROR,
      payload: error.message || 'Failed to fetch award detail',
    });
  }
};

// ============= JOB ACTIONS =============

export const fetchJobs = (url?: string) => async (dispatch: Dispatch) => {
  dispatch({ type: JOB_ACTIONS.FETCH_JOBS_REQUEST });
  try {
    const endpoint = url || API_ENDPOINTS.JOBS;
    const response = await api.get<ApiResponse<Job>>(endpoint);
    dispatch({
      type: JOB_ACTIONS.FETCH_JOBS_SUCCESS,
      payload: {
        items: response.data.results || [],
        pagination: {
          count: response.data.count || 0,
          next: response.data.next || null,
          previous: response.data.previous || null,
        },
      },
    });
  } catch (error: any) {
    dispatch({
      type: JOB_ACTIONS.FETCH_JOBS_ERROR,
      payload: error.message || 'Failed to fetch jobs',
    });
  }
};

export const fetchJobDetail = (id: number) => async (dispatch: Dispatch) => {
  dispatch({ type: JOB_ACTIONS.FETCH_JOB_DETAIL_REQUEST });
  try {
    const response = await api.get<JobDetail>(API_ENDPOINTS.JOB_DETAIL(id));
    dispatch({
      type: JOB_ACTIONS.FETCH_JOB_DETAIL_SUCCESS,
      payload: response.data,
    });
  } catch (error: any) {
    dispatch({
      type: JOB_ACTIONS.FETCH_JOB_DETAIL_ERROR,
      payload: error.message || 'Failed to fetch job detail',
    });
  }
};

// ============= DASHBOARD ACTIONS =============

export const fetchDashboard = () => async (dispatch: Dispatch) => {
  dispatch({ type: DASHBOARD_ACTIONS.FETCH_DASHBOARD_REQUEST });
  try {
    const response = await api.get<DashboardData>(API_ENDPOINTS.DASHBOARD);
    dispatch({
      type: DASHBOARD_ACTIONS.FETCH_DASHBOARD_SUCCESS,
      payload: response.data,
    });
  } catch (error: any) {
    dispatch({
      type: DASHBOARD_ACTIONS.FETCH_DASHBOARD_ERROR,
      payload: error.message || 'Failed to fetch dashboard',
    });
  }
};

// ============= CHATBOT ACTIONS =============

/**
 * Load session from browser storage
 */
export const loadChatbotSession = () => (dispatch: Dispatch) => {
  try {
    const stored = localStorage.getItem('chatbot_session');
    if (!stored) return;
    
    const { sessionId, sessionExpiry, messages } = JSON.parse(stored);
    
    // Check if session is still valid (24h from creation)
    if (new Date(sessionExpiry) > new Date()) {
      dispatch({
        type: CHATBOT_ACTIONS.LOAD_SESSION,
        payload: { sessionId, sessionExpiry, messages },
      });
    } else {
      // Session expired, clear it
      localStorage.removeItem('chatbot_session');
      dispatch({ type: CHATBOT_ACTIONS.CLEAR_MESSAGES });
    }
  } catch (error) {
    console.error('Failed to load chatbot session:', error);
  }
};

/**
 * Save session to browser storage
 */
const saveChatbotSession = (sessionId: string, sessionExpiry: string, messages: ChatMessage[]) => {
  try {
    localStorage.setItem('chatbot_session', JSON.stringify({ sessionId, sessionExpiry, messages }));
  } catch (error) {
    console.error('Failed to save chatbot session:', error);
  }
};

/**
 * Send a message to the chatbot and get a response
 */
export const sendChatMessage = (message: string) => async (dispatch: Dispatch, getState: any) => {
  const state = getState();
  const { sessionId } = state.chatbot;

  dispatch({ type: CHATBOT_ACTIONS.SEND_MESSAGE_REQUEST });

  // Add user message immediately to UI
  const userMessage: ChatMessage = {
    role: 'user',
    content: message,
    timestamp: new Date().toISOString(),
  };

  dispatch({
    type: CHATBOT_ACTIONS.ADD_USER_MESSAGE,
    payload: userMessage,
  });

  try {
    const response = await api.post<{ answer: string; session_id: string; cache_status: string }>(
      API_ENDPOINTS.CHATBOT,
      {
        message,
        session_id: sessionId || null,
      }
    );

    const { answer, session_id, cache_status } = response.data;

    // Calculate 24-hour expiry
    const expiryTime = new Date();
    expiryTime.setHours(expiryTime.getHours() + 24);
    const sessionExpiry = expiryTime.toISOString();

    // Add assistant message
    const assistantMessage: ChatMessage = {
      role: 'assistant',
      content: answer,
      timestamp: new Date().toISOString(),
    };

    dispatch({
      type: CHATBOT_ACTIONS.ADD_ASSISTANT_MESSAGE,
      payload: { ...assistantMessage, cacheStatus: cache_status },
    });

    // Update Redux state with session info
    dispatch({
      type: CHATBOT_ACTIONS.SEND_MESSAGE_SUCCESS,
      payload: {
        sessionId: session_id,
        sessionExpiry,
        cacheStatus: cache_status,
      },
    });

    // Save session to browser storage
    const updatedState = getState();
    saveChatbotSession(session_id, sessionExpiry, updatedState.chatbot.messages);
  } catch (error: any) {
    const errorMessage =
      error.response?.status === 429
        ? 'Too many requests. Please wait a moment before sending another message.'
        : error.message || 'Failed to get response from chatbot. Please try again.';

    dispatch({
      type: CHATBOT_ACTIONS.SEND_MESSAGE_ERROR,
      payload: errorMessage,
    });

    // Add system error message
    const errorSystemMessage: ChatMessage = {
      role: 'system',
      content: `⚠️ ${errorMessage}`,
      timestamp: new Date().toISOString(),
    };

    dispatch({
      type: CHATBOT_ACTIONS.ADD_USER_MESSAGE,
      payload: errorSystemMessage,
    });
  }
};

export const clearChatMessages = () => {
  localStorage.removeItem('chatbot_session');
  return {
    type: CHATBOT_ACTIONS.CLEAR_MESSAGES,
  };
};

// ============= CONTACT ACTIONS =============

export interface ContactFormData {
  name: string;
  email: string;
  category: string;
  other_category?: string;
  message: string;
}

export const submitContactForm = (data: ContactFormData) => async (dispatch: Dispatch) => {
  dispatch({ type: CONTACT_ACTIONS.SUBMIT_CONTACT_REQUEST });
  try {
    await api.post(API_ENDPOINTS.CONTACT, data);
    dispatch({
      type: CONTACT_ACTIONS.SUBMIT_CONTACT_SUCCESS,
    });
  } catch (error: any) {
    dispatch({
      type: CONTACT_ACTIONS.SUBMIT_CONTACT_ERROR,
      payload: error.message || 'Failed to submit contact form',
    });
  }
};

export const resetContactState = () => ({
  type: CONTACT_ACTIONS.RESET_CONTACT_STATE,
});
