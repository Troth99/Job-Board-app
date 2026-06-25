const requiredFields = [
  "name",
  "industry",
  "location",
  "email",
  "phone",
  "officeLocation",
  "sector",
  "description",
  "website",
  "logo",
  "size",
  "foundedYear",
];

type CompanyValidationValues = Record<
  string,
  string | number | null | undefined
>;

//Function to normalize field values and trim whitespace if they are strings,
// or convert them to strings if they are numbers, null, or undefined.

const normalizeFieldValue = (value: string | number | null | undefined) =>
  String(value ?? "").trim();

export function validateCompany(form: CompanyValidationValues) {
  let errors: Record<string, string> = {};

  const websiteRegEx = /^https?:\/\/.+/i;
  const year = Number(normalizeFieldValue(form.foundedYear));

  for (const field of requiredFields) {
    if (normalizeFieldValue(form[field]).length === 0) {
      errors[field] = `This field is required.`;
    }
  }

  if (!errors.name && normalizeFieldValue(form.name).length < 3) {
    errors.name = "Name must be at least 3 characters.";
  }

  if (!errors.website && !websiteRegEx.test(normalizeFieldValue(form.website))) {
    errors.website = "Incorrect URL (it must start with http/https)";
  }

  if (!errors.foundedYear && (year < 1800 || year > new Date().getFullYear())) {
    errors.foundedYear = "Incorrect year";
  }

  return errors;
}
