const requiredFields = [
  "name",
  "industry",
  "location",
  "description",
  "website",
  "logo",
  "size",
  "foundedYear",
];

const formatFieldName = (field: string) => {
  return field.charAt(0).toUpperCase() + field.slice(1);
};


export function validateCompany(form: Record<string, string>) {
  let errors: Record<string, string> = {};

  const websiteRegEx = /^https?:\/\/.+/i;
  const year = Number(form.foundedYear);

  for (const field of requiredFields) {
    if (!form[field] || form[field].trim().length === 0) {
      errors[field] = `${formatFieldName(field)} is required.`;
    }
  }

  if (!errors.name && form.name.length < 3) {
    errors.name = "Name must be at least 3 characters.";
  }

  if (!errors.website && !websiteRegEx.test(form.website)) {
    errors.website = "Incorrect URL (it must start with http/https)";
  }

  if (!errors.foundedYear && (year < 1800 || year > new Date().getFullYear())) {
    errors.foundedYear = "Incorrect year";
  }

  return errors;
}
