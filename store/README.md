# Redux Store Setup

This folder contains the complete Redux state management setup for the Portfolio Frontend application.

## Folder Structure

```
store/
├── constants.ts      # API endpoints and Redux action type constants
├── types.ts          # TypeScript interfaces for all state shapes and API responses
├── actions.ts        # Redux thunk actions for async API calls
├── reducers.ts       # Redux reducers for state updates
├── store.ts          # Redux store configuration and middleware setup
├── hooks.ts          # Custom hooks for using Redux in components
├── index.ts          # Index file for easy imports
└── README.md         # This file
```

## How It Works

### 1. **constants.ts**
Defines all API endpoints and Redux action types:
```typescript
API_ENDPOINTS - Maps API routes (e.g., '/portfolios/', '/blogs/')
PORTFOLIO_ACTIONS - Action type constants for portfolio-related actions
BLOG_ACTIONS - Action type constants for blog-related actions
// ... and more for other resources
```

### 2. **types.ts**
Contains all TypeScript interfaces:
- Data types from API (Portfolio, Blog, Certificate, etc.)
- Redux state shapes (PortfolioState, BlogState, etc.)
- Root state type (RootState)

### 3. **actions.ts**
Redux thunk actions for async operations:
```typescript
fetchPortfolios() - GET /portfolios/
fetchPortfolioDetail(slug) - GET /portfolios/{slug}/
fetchBlogs() - GET /blogs/
// ... and more
```

Each action:
- Dispatches a REQUEST action (loading state)
- Calls the API via axios
- Dispatches SUCCESS or ERROR action with payload

### 4. **reducers.ts**
Pure functions that update Redux state:
- PortfolioReducer - Handles portfolio state
- BlogReducer - Handles blog state
- CertificateReducer - Handles certificate state
- // ... and more

All follow the pattern:
```
REQUEST → sets loading: true
SUCCESS → updates data, loading: false
ERROR → sets error message, loading: false
```

### 5. **store.ts**
Redux store configuration:
- Combines all reducers
- Applies middleware (redux-thunk for async)
- Includes logging middleware in development
- Exports store and AppDispatch type

### 6. **hooks.ts**
Custom hooks for convenient Redux usage:
- `useAppDispatch()` - Typed dispatch hook
- `useAppSelector()` - Typed selector hook

## Usage in Components

### 1. **Dispatching Actions** (in async components)
```typescript
'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchPortfolios } from '@/store/actions';
import { useEffect } from 'react';

export function PortfolioList() {
  const dispatch = useAppDispatch();
  const { portfolios, loading, error } = useAppSelector(state => state.portfolio);

  useEffect(() => {
    dispatch(fetchPortfolios() as any);
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {portfolios.map(p => (
        <div key={p.id}>{p.name}</div>
      ))}
    </div>
  );
}
```

### 2. **Using Selectors**
```typescript
const blogs = useAppSelector(state => state.blog.blogs);
const certificateLoading = useAppSelector(state => state.certificate.loading);
const messages = useAppSelector(state => state.chatbot.messages);
```

### 3. **Dispatching Actions**
```typescript
// Fetching list
dispatch(fetchBlogs() as any);

// Fetching detail
dispatch(fetchBlogDetail('my-blog-slug') as any);

// Submitting contact form
dispatch(submitContactForm({
  name: 'John',
  email: 'john@example.com',
  subject: 'Hello',
  message: 'Hi there'
}) as any);

// Sending chat message
dispatch(sendChatMessage('Hello chatbot') as any);
```

## Environment Variables

The API base URL is defined in `.env.local`:
```
NEXT_PUBLIC_API_URL=https://pservice.mrphilip.cv/api
```

This is automatically picked up by the axios instance in `lib/api.ts`.

## API Endpoints Covered

- **Portfolios**: List, Detail
- **Blogs**: List, Detail  
- **Certificates**: List, Detail
- **Awards**: List, Detail
- **Jobs**: List, Detail
- **Dashboard**: Summary view
- **Contact**: Form submission
- **Chatbot**: Message sending

## State Structure

```typescript
{
  portfolio: {
    portfolios: [],
    portfolioDetail: null,
    loading: false,
    error: null
  },
  blog: {
    blogs: [],
    blogDetail: null,
    loading: false,
    error: null
  },
  // ... similar structure for other resources
  chatbot: {
    messages: [],
    loading: false,
    error: null
  },
  contact: {
    submitted: false,
    loading: false,
    error: null
  }
}
```

## Next Steps

To integrate Redux with UI components:

1. Import `useAppDispatch` and `useAppSelector` from `@/store/hooks`
2. Call action creators in `useEffect` to fetch data
3. Use selectors to access state in components
4. Handle loading and error states in your UI
5. Dispatch submit actions for forms

All the infrastructure is ready - just connect it to your UI components!
