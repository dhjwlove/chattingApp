import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './module';

export default function configureAppStore() {
  const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
  });

  return store;
}
