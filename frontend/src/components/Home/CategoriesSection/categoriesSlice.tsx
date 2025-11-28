import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category } from "../../../hooks/useCategories";



interface categoriesState {
    categories: Category[]
    showAll: boolean;
}

const initialState: categoriesState = {
    categories: [],
    showAll: false
}


const categoriesSlice = createSlice({
  name: 'categories', 
  initialState,       
  reducers: {
  
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload; 
    },
   
    toggleShowAll: (state) => {
      state.showAll = !state.showAll; 
    },
  },
});

export const {
    setCategories,
    toggleShowAll
} = categoriesSlice.actions

export default categoriesSlice.reducer