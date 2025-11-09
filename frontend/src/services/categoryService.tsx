import { API_BASE } from "./api";


export interface Category {
  _id: string;
  name: string;
  shortName: string;
}

export async function getAllCategories() {

    const res = await fetch(`${API_BASE}/categories`);

    if(!res.ok){
        throw new Error('Failed to fetch categories')
    }

    return res.json()
}