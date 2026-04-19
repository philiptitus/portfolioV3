import { createStore, combineReducers, applyMiddleware, Middleware } from 'redux';
import { thunk } from 'redux-thunk';
import {
  portfolioReducer,
  blogReducer,
  certificateReducer,
  awardReducer,
  jobReducer,
  dashboardReducer,
  chatbotReducer,
  contactReducer,
} from './reducers';
import { RootState } from './types';

const rootReducer = combineReducers<RootState>({
  portfolio: portfolioReducer,
  blog: blogReducer,
  certificate: certificateReducer,
  award: awardReducer,
  job: jobReducer,
  dashboard: dashboardReducer,
  chatbot: chatbotReducer,
  contact: contactReducer,
});

const middleware: Middleware[] = [thunk];

// Add logging middleware in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  const logger: Middleware = (store) => (next) => (action) => {
    console.log('dispatching', action);
    const result = next(action);
    console.log('next state', store.getState());
    return result;
  };
  middleware.push(logger);
}

export const store = createStore(
  rootReducer,
  applyMiddleware(...middleware)
);

export type AppDispatch = typeof store.dispatch;

export default store;
