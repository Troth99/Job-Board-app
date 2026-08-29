// Helper to get .name if object, or fallback to string
export function getName(val?: string | { name?: string; _id?: string; firstName?: string; lastName?: string }): string {
  if (!val) return '';
  if (typeof val === 'string') return val;

  // Try to construct full name from firstName and lastName
  const fullName = [val.firstName, val.lastName].filter(Boolean).join(' ').trim();

  if (fullName) return fullName;
  return val.name || val._id || "";

}
