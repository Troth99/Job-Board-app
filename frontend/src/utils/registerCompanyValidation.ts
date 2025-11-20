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

export function validateCompany(form: Record<string, string>) {
  let errors: Record<string, string> = {};
  
  const websiteRegEx = /^https?:\/\/.+/i;

  for (const field of requiredFields) {
    if (!form[field] || form[field].trim().length === 0) {
      errors[field] = `${field} is required.`;
    }
  }

  if (!errors.name && form.name.length < 3) {
    errors.name = "Name must be at least 3 characters.";
  }

  if (!errors.website && !websiteRegEx.test(form.website)) {
    errors.website = "Incorrect URL (it must start with http/https)";
  }

    const year = Number(form.foundedYear);
  if (!errors.foundedYear && (year < 1800 || year > new Date().getFullYear())) {
    errors.foundedYear = "Incorrect year";
  }


  return errors;
}
