import { Category } from "../hooks/useCategories";
import { Company } from "../hooks/useCompany";

export interface Job {
  _id?: string;
  title?: string;
  description?: string;
  location?: string;
  salary?: string;
  createdBy?: {
    email?: string;
    firstName?: string;
    lastName?: string;
  };
  company?: Company | null;
  category?: Category;
  createdAt?: string;
  skills?: string;
  employmentType?: string;
  benefits?: string[];
  applicationDeadline?: string;
  views?: number;
  isActive: boolean;
  tags?: string;
  email?: string;
  updatedAt?: string;
}

export interface valuesInterface {
  _id?: string;
  title: string;
  description: string;
  location: string;
  salary: string;
  category: Category;
  employmentType: string;
  skills: string;
  benefits: string[];
  tags: string;
  email: string;
  [key: string]: any;
}