import { valuesInterface } from "../../interfaces/Job.model";


const normalize = (arr: any) =>
  Array.isArray(arr)
    ? arr.flatMap((s) =>
        typeof s === "string" ? s.split(",").map((x) => x.trim()) : []
      )
    : typeof arr === "string"
    ? arr.split(",").map((x) => x.trim())
    : [];

export function jobPostValidations(form: valuesInterface) {
  let errors: Record<string, string> = {};

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

if (normalize(form.skills).filter(Boolean).length === 0) {
  errors.skills = "Skills are required.";
}
  if (normalize(form.benefits).filter(Boolean).length === 0) {
    errors.benefits = "Benefits are required.";
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
