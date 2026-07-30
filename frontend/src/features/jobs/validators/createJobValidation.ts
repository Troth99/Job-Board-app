import { valuesInterface } from "../types/Job.model";

//function to normalize the array of strings, removing empty strings and trimming whitespace
const normalize = (arr: any) =>
  Array.isArray(arr)
    ? arr.flatMap((s) =>
        typeof s === "string" ? s.split(",").map((x) => x.trim()) : [],
      )
    : typeof arr === "string"
      ? arr.split(",").map((x) => x.trim())
      : [];

export function jobPostValidations(
  form: valuesInterface,
  messages: Record<string, string>,
): Record<string, string> {

  let errors: Record<string, string> = {};

  const openingsValue =
    form.openings === undefined || form.openings === null
      ? ""
      : String(form.openings).trim();

  const hasCategory =
    typeof form.category === "string"
      ? form.category.trim().length > 0
      : Boolean(form.category?._id || form.category?.name);

  if (!form.title || form.title.trim().length === 0) {
    errors.title = messages.titleRequired;
  }

  if (!form.description || form.description.trim().length === 0) {
    errors.description = messages.descriptionRequired;
  }
  if (!form.location || form.location.trim().length === 0) {
    errors.location = messages.locationRequired;
  }
  if (!form.salary || form.salary.trim().length === 0) {
    errors.salary = messages.salaryRequired;
  }

  if (form.workMode && form.workMode.trim().length === 0) {
    errors.workMode = messages.workModeCannotBeEmpty;
  }

  if (!hasCategory) {
    errors.category = messages.categoryRequired;
  }

  if (typeof form.workMode === "string" && form.workMode.trim().length === 0) {
    errors.workMode = messages.workModeRequired;
  }

  if (
    typeof form.experienceLevel === "string" &&
    form.experienceLevel.trim().length === 0
  ) {
    errors.experienceLevel = messages.experienceLevelRequired;
  }

  if (!form.employmentType || form.employmentType.trim().length === 0) {
    errors.employmentType = messages.employmentTypeRequired;
  }

  if (openingsValue.length === 0) {
    errors.openings = messages.openingsRequired;
  } else if (Number.isNaN(Number(openingsValue))) {
    errors.openings = messages.openingsNumberInvalid;
  } else if (Number(openingsValue) <= 0) {
    errors.openings = messages.openingsAtLeastOne;
  }

  if (normalize(form.educationLevel).filter(Boolean).length === 0) {
    errors.educationLevel = messages.educationLevelRequired;
  }

  if (normalize(form.requirements).filter(Boolean).length === 0) {
    errors.requirements = messages.requirementsRequired;
  }

  if (!form.email || form.email.trim().length === 0) {
    errors.email = messages.emailRequired;
  }

  if (
    form.requiredExperienceYears &&
    Number(form.requiredExperienceYears) < 0
  ) {
    errors.requiredExperienceYears = messages.experienceYearsNegative;
  }

  if (form.applicationDeadline) {
    const selectedDate = new Date(form.applicationDeadline);
    if (Number.isNaN(selectedDate.getTime())) {
      errors.applicationDeadline = messages.invalidDeadlineDate;
    }
  }

  return errors;
}
