import { Category } from "./categoryService";


export interface Job {
  _id: string;
  title: string;
  description: string;
  location: string;
  salary?: string;
  type: string;
  category: Category;
  company?: { name: string };
}