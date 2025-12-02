import { valuesInterface } from "../../interfaces/Job.model";

export function jobPostValidations(form:valuesInterface) {
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

  if (!form.skills || form.skills.trim().length === 0) {
    errors.skills = "Skills are required.";
  }
  if (!form.benefits || form.benefits.trim().length === 0) {
    errors.benefits = "Benefits are required.";
  }
  if (!form.tags || form.tags.trim().length === 0) {
    errors.tags = "Tags are required.";
  }
  if (!form.email || form.email.trim().length === 0) {
    errors.email = "Email is required.";
  }

  return errors;
}
