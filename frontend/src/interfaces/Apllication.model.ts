export interface ApplicationFormData {
  jobId: string;
  userId?: string;
  email: string;
  phone?: string;
  coverLetter?: string;
  cv: File | string;
  filename:string
}

export interface Candidate {
_id: string;
email: string;
cv: string;
appliedAt?: string;
status?: string
}
export type FormValues = { email: string; phone: string; cv: string | File; coverLetter: string };
