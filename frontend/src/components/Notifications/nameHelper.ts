// Helper to get .name if object, or fallback to string
export function getName(val?: string | { name?: string; _id?: string; firstName?: string; lastName?: string }): string {
  if (!val) return '';
  if (typeof val === 'string') return val;
  if (val.firstName && val.lastName) return `${val.firstName} ${val.lastName}`;
  return val.name || val._id || '';
}
