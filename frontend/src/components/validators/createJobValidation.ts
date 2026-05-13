import { valuesInterface } from "../../interfaces/Job.model";

const normalize = (arr: any) =>
  Array.isArray(arr)
    ? arr.flatMap((s) =>
        typeof s === "string" ? s.split(",").map((x) => x.trim()) : [],
      )
    : typeof arr === "string"
      ? arr.split(",").map((x) => x.trim())
      : [];

export function jobPostValidations(form: valuesInterface) {
  let errors: Record<string, string> = {};

  const hasCategory =
    typeof form.category === "string"
      ? form.category.trim().length > 0
      : Boolean(form.category?._id || form.category?.name);

  if (!form.title || form.title.trim().length === 0) {
    errors.title = "Title is required.";
  }

  if (!form.description || form.description.trim().length === 0) {
    errors.description = "Description is required.";
  }
  if (!form.location || form.location.trim().length === 0) {
    errors.location = "Location is required.";
  }
  if (!form.salary || form.salary.trim().length === 0) {
    errors.salary = "Salary is required.";
  }

  if (form.workMode && form.workMode.trim().length === 0) {
    errors.workMode = "Work mode cannot be empty.";
  }

  if (!hasCategory) {
    errors.category = "Category is required.";
  }

  if (typeof form.workMode === "string" && form.workMode.trim().length === 0) {
    errors.workMode = "Work mode is required.";
  }

  if (
    typeof form.employmentType === "string" &&
    form.employmentType.trim().length === 0
  ) {
    errors.employmentType = "Employment type is required.";
  }

  if (
    typeof form.experienceLevel === "string" &&
    form.experienceLevel.trim().length === 0
  ) {
    errors.experienceLevel = "Experience level is required.";
  }

  if (!form.employmentType || form.employmentType.trim().length === 0) {
    errors.employmentType = "Employment type is required.";
  }

  if (form.openings && Number(form.openings) <= 0) {
    errors.openings = "Openings must be at least 1.";
  }

    if(normalize(form.educationLevel).filter(Boolean).length === 0) {
      errors.educationLevel = "Education level is required.";
    }

  if (
    !form.requiredExperienceYears ||
    form.requiredExperienceYears.trim().length === 0
  ) {
    errors.requiredExperienceYears = "Required experience years is required.";
  }

  if (normalize(form.skills).filter(Boolean).length === 0) {
    errors.skills = "Requirements are required.";
  }
  if (normalize(form.tags).filter(Boolean).length === 0) {
    errors.tags = "Tags are required.";
  }
  if (!form.email || form.email.trim().length === 0) {
    errors.email = "Email is required.";
  }

  if (
    form.requiredExperienceYears &&
    Number(form.requiredExperienceYears) < 0
  ) {
    errors.requiredExperienceYears = "Experience years cannot be negative.";
  }

  if (form.openings && Number(form.openings) <= 0) {
    errors.openings = "Open positions must be at least 1.";
  }

  if (form.applicationDeadline) {
    const selectedDate = new Date(form.applicationDeadline);
    if (Number.isNaN(selectedDate.getTime())) {
      errors.applicationDeadline = "Invalid application deadline date.";
    }
  }

  return errors;
}
