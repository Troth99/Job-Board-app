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
  phone: string;
  cv: string;
  appliedAt?: string;
  status?: string;
  userId?: string; // id на потребителя-кандидат
  companyId?: string; // id на компанията (ако е нужно)
}
export type FormValues = { email: string; phone: string; cv: string | File; coverLetter: string };
