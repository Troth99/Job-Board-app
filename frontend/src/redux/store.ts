
import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from "../components/Home/CategoriesSection/categoriesSlice"
import authReducer from './authSlice';


export const store = configureStore({
  reducer: {
    categories: categoriesReducer,  
     auth: authReducer,

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;