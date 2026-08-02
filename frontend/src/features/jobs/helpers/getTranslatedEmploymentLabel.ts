
import { t } from "@lingui/core/macro";
//helper function getTranslatedEmploymentLabel
export function getTranslatedEmploymentLabel(value: string) {
  switch (value) {
    case "Full-time":
      return t`Full-time`;
    case "Part-time":
      return t`Part-time`;
    case "Internship":
      return t`Internship`;
    case "Contract":
      return t`Contract`;
    case "Freelance":
      return t`Freelance`;
    case "Temporary":
      return t`Temporary`;
    case "Volunteer":
      return t`Volunteer`;
    case "Seasonal":
      return t`Seasonal`;
    case "Apprenticeship":
      return t`Apprenticeship`;
    default:
      return value;
  }
}

export function getTranslatedCategoryLabel(value: string) {
    switch( value) {
        case "Information Technology":
            return t`Information Technology`;
        case "Finance & Accounting":
            return t`Finance & Accounting`;
        case "Marketing & Advertising":
            return t`Marketing & Advertising`;
        case "Human Resources":
            return t`Human Resources`;
        case "Design & Creative":
            return t`Design & Creative`;
        case "Sales & Business Development":
            return t`Sales & Business Development`;
        case "Customer Support":
            return t`Customer Support`;
        case "Operations & Logistics":
            return t`Operations & Logistics`;
        case "Education & Training":
            return t`Education & Training`;
        case "Legal & Compliance":
            return t`Legal & Compliance`;
        case "Healthcare & Medical":
            return t`Healthcare & Medical`;
        case "Engineering & Manufacturing":
            return t`Engineering & Manufacturing`;
        case "Science & Research":
            return t`Science & Research`;
        case "Consulting & Strategy":
            return t`Consulting & Strategy`;
        case "Media & Communication":
            return t`Media & Communication`;
        case "Data Science & Analytics":
            return t`Data Science & Analytics`;
        case "Retail & E-commerce":
            return t`Retail & E-commerce`;
        case "Hospitality & Tourism":
            return t`Hospitality & Tourism`;
        case "Real Estate & Property":
            return t`Real Estate & Property`;
        case "Food & Beverage":
            return t`Food & Beverage`;
        case "Transportation & Delivery":
            return t`Transportation & Delivery`;
        case "Non-Profit & NGO":
            return t`Non-Profit & NGO`;
        default:
            return value;
    }


  }
