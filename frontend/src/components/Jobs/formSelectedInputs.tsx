import React from "react";

interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const categories = [
  { value: "IT", label: "IT / Software Development" },
  { value: "Design", label: "Design / Creative" },
  { value: "Marketing", label: "Marketing / Sales" },
  { value: "Finance", label: "Finance / Accounting" },
  { value: "HR", label: "Human Resources" },
  { value: "Customer Support", label: "Customer Support" },
  { value: "Operations", label: "Operations / Management" },
  { value: "Education", label: "Education / Training" },
  { value: "Healthcare", label: "Healthcare / Medical" },
  { value: "Engineering", label: "Engineering / Technical" },
  { value: "Legal", label: "Legal / Compliance" },
  { value: "Hospitality", label: "Hospitality / Tourism" },
  { value: "Logistics", label: "Logistics / Supply Chain" },
  { value: "Media", label: "Media / Communications" },
  { value: "Research", label: "Research / Science" },
  { value: "Construction", label: "Construction / Architecture" },
  { value: "Retail", label: "Retail / Customer Experience" },
  { value: "Agriculture", label: "Agriculture / Farming" },
  { value: "Non-Profit", label: "Non-Profit / NGO" },
  { value: "other", label: "Other" },
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
export  function EmploymentTypeSelect({ value, onChange }: Props) {
  return (
    <select id="employmentType" name="type" value={value} onChange={onChange}>
      <option value="">Select Employment Type</option>
      {employmentOptions.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}


