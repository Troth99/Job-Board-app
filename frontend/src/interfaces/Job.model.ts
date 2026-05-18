import { Category } from "../hooks/utils/useCategories";
import { Company } from "../hooks/utils/useCompany";

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
  category?: Category | string;
  createdAt?: string;
  skills?: string;
  requirements?: string;
  employmentType?: string;
  benefits?: string | string[];
  applicationDeadline?: string;
  workMode?: string;
  experienceLevel?: string;
  requiredExperienceYears?: string;
  openings?: string;
  contractType?: string;
  workSchedule?: string;
  languageRequirements?: string;
  educationLevel?: string;
  views?: number;
  isActive: boolean;
  tags?: string;
  email?: string;
  additionalInfo?: string;
  updatedAt?: string;
}

export interface valuesInterface {
  _id?: string;
  title: string;
  description: string;
  location: string;
  salary: string;
  category: Category | string;
  employmentType: string;
  requirements: string;
  benefits: string;
  tags: string;
  email: string;
  workMode?: string;
  experienceLevel?: string;
  requiredExperienceYears?: string;
  applicationDeadline?: string;
  openings?: string;
  contractType?: string;
  workSchedule?: string;
  languageRequirements?: string;
  educationLevel?: string;
  additionalInfo?: string;
  [key: string]: any;
}