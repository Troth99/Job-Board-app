
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice/authSlice';
import categoriesReducer from '../features/categories/components/CategoriesSection/categoriesSlice';

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,  
     auth: authReducer,

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;