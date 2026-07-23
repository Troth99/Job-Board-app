import React from "react";
import { Trans,  } from "@lingui/react/macro";
import { Category } from "../../categories/types/category";
import { t } from "@lingui/macro";
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
  { value: "Information Technology", label: `Information Technology` },
  { value: "Finance & Accounting", label: t`Finance & Accounting` },
  { value: "Marketing & Advertising", label: t`Marketing & Advertising` },
  { value: "Human Resources", label: t`Human Resources` },
  { value: "Design & Creative", label: t`Design & Creative` },
  { value: "Sales & Business Development", label: t`Sales & Business Development` },
  { value: "Customer Support", label: t`Customer Support` },
  { value: "Operations & Logistics", label: t`Operations & Logistics` },
  { value: "Education & Training", label: t`Education & Training` },
  { value: "Legal & Compliance", label: t`Legal & Compliance` },
  { value: "Healthcare & Medical", label: t`Healthcare & Medical` },
  { value: "Engineering & Manufacturing", label: t`Engineering & Manufacturing` },
  { value: "Science & Research", label: t`Science & Research` },
  { value: "Consulting & Strategy", label: t`Consulting & Strategy` },
  { value: "Media & Communication", label: t`Media & Communication` },
  { value: "Data Science & Analytics", label: t`Data Science & Analytics` },
  { value: "Retail & E-commerce", label: t`Retail & E-commerce` },
  { value: "Hospitality & Tourism", label: t`Hospitality & Tourism` },
  { value: "Real Estate & Property", label: t`Real Estate & Property` },
  { value: "Food & Beverage", label: t`Food & Beverage` },
  { value: "Transportation & Delivery", label: t`Transportation & Delivery` },
  { value: "Non-Profit & NGO", label: t`Non-Profit & NGO` },
];

//for Employement options
export const employmentOptions = [
  { value: "Full-time", label: t`Full-time` },
  { value: "Part-time", label: t`Part-time` },
  { value: "Internship", label: t`Internship` },
  { value: "Contract", label: t`Contract` },
  { value: "Freelance", label: t`Freelance` },
  { value: "Temporary", label: t`Temporary` },
  { value: "Volunteer", label: t`Volunteer` },
  { value: "Seasonal", label: t`Seasonal` },
  { value: "Apprenticeship", label: t`Apprenticeship` },
];

//For Experience requirement options, we can use the same select component as employment type, just with different options. So I will implement it later when I implement the experience requirement field in the form.

export const experienceOptions = [
  { value: "No prior experience required", label: t`No prior experience required` },
  { value: "Some experience preferred (6+ months)", label: t`Some experience preferred (6+ months)` },
  { value: "1+ year relevant experience", label: t`1+ year relevant experience` },
  { value: "2+ years relevant experience", label: t`2+ years relevant experience` },
  { value: "3+ years relevant experience", label: t`3+ years relevant experience` },
  { value: "5+ years relevant experience", label: t`5+ years relevant experience` },
  { value: "Supervisory experience required", label: t`Supervisory experience required` },
  { value: "Management experience required", label: t`Management experience required` },
]

export const workModeOptions = [
  { value: "On-site", label: t`On-site` },
  { value: "Hybrid", label: t`Hybrid` },
  { value: "Remote", label: t`Remote` },
];

export  function JobCategorySelect({ value, onChange }: Props) {

  return (
    <select name="category" value={value } onChange={onChange}>
      <option value="" disabled>
        <Trans>Select category</Trans>
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
      <option value=""><Trans>Select a category</Trans></option>
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
        <Trans>Select employment type</Trans>
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
        <Trans>Select experience level</Trans>
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
        <Trans>Select work mode</Trans>
      </option>
      {workModeOptions.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
