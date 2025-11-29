import React from "react";
import { Category } from "../../hooks/useCategories";

interface Props {
  value: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
interface JobCategorySelectProps {
  value: Category | null; 
  categories: Category[]; 
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
const categories = [
  { value: "Information Technology", label: "Information Technology" },
  { value: "Finance & Accounting", label: "Finance & Accounting" },
  { value: "Marketing & Advertising", label: "Marketing & Advertising" },
  { value: "Human Resources", label: "Human Resources" },
  { value: "Design & Creative", label: "Design & Creative" },
  { value: "Sales & Business Development", label: "Sales & Business Development" },
  { value: "Customer Support", label: "Customer Support" },
  { value: "Operations & Logistics", label: "Operations & Logistics" },
  { value: "Education & Training", label: "Education & Training" },
  { value: "Legal & Compliance", label: "Legal & Compliance" },
  { value: "Healthcare & Medical", label: "Healthcare & Medical" },
  { value: "Engineering & Manufacturing", label: "Engineering & Manufacturing" },
  { value: "Science & Research", label: "Science & Research" },
  { value: "Consulting & Strategy", label: "Consulting & Strategy" },
  { value: "Media & Communication", label: "Media & Communication" },
  { value: "Data Science & Analytics", label: "Data Science & Analytics" },
  { value: "Retail & E-commerce", label: "Retail & E-commerce" },
  { value: "Hospitality & Tourism", label: "Hospitality & Tourism" },
  { value: "Real Estate & Property", label: "Real Estate & Property" },
  { value: "Food & Beverage", label: "Food & Beverage" },
  { value: "Transportation & Delivery", label: "Transportation & Delivery" },
  { value: "Non-Profit & NGO", label: "Non-Profit & NGO" },
];

//for Employement options
export const employmentOptions = [
  { value: "Full-time", label: "Full-time" },
  { value: "Part-time", label: "Part-time" },
  { value: "Internship", label: "Internship" },
  { value: "Contract", label: "Contract" },
  { value: "Freelance", label: "Freelance" },
  { value: "Temporary", label: "Temporary" },
  { value: "Remote", label: "Remote" },
  { value: "On-site", label: "On-site" },
  { value: "Volunteer", label: "Volunteer" },
  { value: "Seasonal", label: "Seasonal" },
  { value: "Apprenticeship", label: "Apprenticeship" },
  { value: "Hybrid", label: "Hybrid" },
];
export  function JobCategorySelect({ value, onChange }: Props) {

  return (
    <select name="category" value={value } onChange={onChange}>
      <option value="">Select a category</option>
      {categories.map((cat) => (
        <option key={cat.value} value={cat.value}>
          {cat.label}
        </option>
      ))}
    </select>
  );
}
export  function JobEditCategory({ value, categories, onChange }: JobCategorySelectProps) {

  return (
    <select name="category" value={value?._id} onChange={onChange}>
      <option value="">Select a category</option>
      {categories.map((category) => (
        <option key={category._id} value={category._id}>
          {category.name}
        </option>
      ))}
    </select>
  );
}

export  function EmploymentTypeSelect({ value, onChange }: Props) {
  return (
    <select id="employmentType" name="employmentType" value={value} onChange={onChange}>
      <option value="">Select Employment Type</option>
      {employmentOptions.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}



