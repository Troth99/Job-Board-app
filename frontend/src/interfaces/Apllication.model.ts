export interface ApplicationFormData {
  jobId: string;
  userId?: string;
  email: string;
  phone?: string;
  coverLetter?: string;
  cv: File | string;
  filename:string
}
export type FormValues = { email: string; phone: string; cv: string | File; coverLetter: string };
