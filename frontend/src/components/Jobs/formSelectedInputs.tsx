import React from "react";
import { Category } from "../../hooks/utils/useCategories";

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
  { value: "Volunteer", label: "Volunteer" },
  { value: "Seasonal", label: "Seasonal" },
  { value: "Apprenticeship", label: "Apprenticeship" },
];

//For Experience requirement options, we can use the same select component as employment type, just with different options. So I will implement it later when I implement the experience requirement field in the form.

export const experienceOptions = [
  { value: "No prior experience required", label: "No prior experience required" },
  { value: "Some experience preferred (6+ months)", label: "Some experience preferred (6+ months)" },
  { value: "1+ year relevant experience", label: "1+ year relevant experience" },
  { value: "2+ years relevant experience", label: "2+ years relevant experience" },
  { value: "3+ years relevant experience", label: "3+ years relevant experience" },
  { value: "5+ years relevant experience", label: "5+ years relevant experience" },
  { value: "Supervisory experience required", label: "Supervisory experience required" },
  { value: "Management experience required", label: "Management experience required" },
]

export const workModeOptions = [
  { value: "On-site", label: "On-site" },
  { value: "Hybrid", label: "Hybrid" },
  { value: "Remote", label: "Remote" },
];

export  function JobCategorySelect({ value, onChange }: Props) {

  return (
    <select name="category" value={value } onChange={onChange}>
      <option value="" disabled>
        Select category
      </option>
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
      <option value="" disabled>
        Select employment type
      </option>
      {employmentOptions.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

export function ExperienceLevelSelect({ value, onChange }: Props) {
  return (
    <select id="experienceLevel" name="experienceLevel" value={value} onChange={onChange}>
      <option value="" disabled>
        Select experience level
      </option>
      {experienceOptions.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

export function WorkModeSelect({ value, onChange }: Props) {
  return (
    <select id="workMode" name="workMode" value={value} onChange={onChange}>
      <option value="" disabled>
        Select work mode
      </option>
      {workModeOptions.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
