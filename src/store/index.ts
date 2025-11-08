import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import authReducer from './authSlice';
import forumReducer from './forumSlice';
import adminReducer from './adminSlice';

// Load persisted state from localStorage
const loadState = (): { auth?: Partial<ReturnType<typeof authReducer>>; admin?: Partial<ReturnType<typeof adminReducer>> } | undefined => {
  try {
    const serializedState = localStorage.getItem('redux-auth-storage');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};


export const store = configureStore({
  reducer: {
    auth: authReducer,
    forum: forumReducer,
    admin: adminReducer,
  },
  preloadedState: loadState(),
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Save state to localStorage
const saveState = (state: RootState) => {
  try {
    const serializedState = JSON.stringify({
      auth: {
        user: state.auth.user,
        isAuthenticated: state.auth.isAuthenticated,
      },
    });
    localStorage.setItem('elevy-redux-state', serializedState);
  } catch {
    // Ignore write errors
  }
};

// Subscribe to store changes and persist
store.subscribe(() => {
  saveState(store.getState());
});

// Typed hooks
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
